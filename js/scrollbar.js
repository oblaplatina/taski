const slider = document.querySelector('.card-slider');
const thumb = document.querySelector('.custom-scrollbar-thumb');
const scrollbar = document.querySelector('.custom-scrollbar');
let isDown = false;
let isDraggingThumb = false;
let startX;
let scrollLeft;

// Функция для обновления положения ползунка
function updateThumbPosition() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const scrollPercentage = slider.scrollLeft / maxScrollLeft;
  const thumbMaxPosition = scrollbar.offsetWidth - thumb.offsetWidth;
  thumb.style.left = scrollPercentage * thumbMaxPosition + 'px';
}

// Перетаскивание за карточки
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  isDraggingThumb = false; // Мы не тянем ползунок
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown || isDraggingThumb) return; // Если не нажата мышь или тянем ползунок, не продолжаем
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // Плавный коэффициент для перемещения
  slider.scrollLeft = scrollLeft - walk;
  updateThumbPosition(); // Обновляем положение кастомного ползунка
});

// Перетаскивание за кастомный скроллбар
thumb.addEventListener('mousedown', (e) => {
  isDown = true;
  isDraggingThumb = true; // Начинаем тянуть ползунок
  startX = e.pageX; // Запоминаем начальное положение по X
  scrollLeft = slider.scrollLeft; // Запоминаем текущее положение скролла
});

scrollbar.addEventListener('mousedown', (e) => {
  if (e.target !== thumb) {
    isDown = true;
    isDraggingThumb = true; // Имитируем перетаскивание ползунка
    const thumbMaxPosition = scrollbar.offsetWidth - thumb.offsetWidth;
    let clickPosition = e.pageX - scrollbar.offsetLeft - thumb.offsetWidth / 2;
    clickPosition = Math.max(0, Math.min(thumbMaxPosition, clickPosition));
    
    thumb.style.left = clickPosition + 'px';

    // Прокручиваем карточки в зависимости от позиции ползунка
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const scrollPercentage = clickPosition / thumbMaxPosition;
    slider.scrollLeft = scrollPercentage * maxScrollLeft;
  }
});

document.addEventListener('mouseup', () => {
  isDown = false;
  isDraggingThumb = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown || !isDraggingThumb) return; // Если не тянем ползунок, не продолжаем
  e.preventDefault();
  
  const thumbMaxPosition = scrollbar.offsetWidth - thumb.offsetWidth;
  const delta = e.pageX - startX; // Разница между начальной и текущей позицией
  const thumbMovePercentage = delta / thumbMaxPosition; // Рассчитываем процент перемещения
  const sliderMove = thumbMovePercentage * (slider.scrollWidth - slider.clientWidth); // Плавный скролл карточек
  
  // Обновляем прокрутку карточек
  slider.scrollLeft = scrollLeft + sliderMove;
  
  // Ограничиваем перемещение ползунка
  let newThumbPosition = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * thumbMaxPosition;
  newThumbPosition = Math.max(0, Math.min(thumbMaxPosition, newThumbPosition)); // Ограничиваем перемещение ползунка
  thumb.style.left = newThumbPosition + 'px';
});