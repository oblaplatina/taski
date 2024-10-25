function closeNotificationBar() {
    const bar = document.getElementById('notificationBar');
    bar.classList.add('notification-bar-hidden');
}


const brazilPoint = document.getElementById('brazil-point');
const tooltipBrazil = document.getElementById('tooltip-brazil');

brazilPoint.addEventListener('mouseenter', function() {
    tooltipBrazil.style.display = 'block';  // Используй одинарные кавычки
});

brazilPoint.addEventListener('mouseleave', function() {
    tooltipBrazil.style.display = 'none';  // Используй одинарные кавычки
});

const chinaPoint = document.getElementById('china-point');
const tooltipChina = document.getElementById('tooltip-china');

chinaPoint.addEventListener('mouseenter', function() {
    tooltipChina.style.display = 'block';  // Используй одинарные кавычки
});

chinaPoint.addEventListener('mouseleave', function() {
    tooltipChina.style.display = 'none';  // Используй одинарные кавычки
});

