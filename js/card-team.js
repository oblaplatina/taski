document.addEventListener('DOMContentLoaded', preloadImages);

// Вызываем эту функцию при загрузке страницы для установки раздела "Management" активным по умолчанию
document.addEventListener('DOMContentLoaded', function () {
    selectTeam('management');
});

function selectTeam(team) {
    // Убираем класс "active" у всех пунктов меню
    document.querySelectorAll('.team-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Добавляем класс "active" к выбранному пункту
    document.getElementById('nav-' + team).classList.add('active');

    // Скрываем все блоки с карточками
    document.querySelectorAll('.team-cards').forEach(cards => {
        cards.classList.add('hidden');
    });

    // Отображаем выбранный блок с карточками
    document.getElementById('team-cards-' + team).classList.remove('hidden');
}


function loadMoreCards() {
    // Находим все скрытые карточки из всех разделов
    const hiddenCards = document.querySelectorAll('.team-cards.hidden .profile-card');

    // Находим контейнер текущих видимых карточек
    const visibleContainer = document.querySelector('.team-cards:not(.hidden)');

    // Перемещаем каждую скрытую карточку в видимый контейнер
    hiddenCards.forEach(card => {
        visibleContainer.appendChild(card);
    });

    // После перемещения всех карточек, скрываем все пустые разделы
    document.querySelectorAll('.team-cards').forEach(cards => {
        if (cards !== visibleContainer) {
            cards.classList.add('hidden');
        }
    });

    // Обновляем активный пункт меню на "Management", так как все карточки теперь отображаются в одном блоке
    document.querySelectorAll('.team-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-management').classList.add('active');
}


// Объект с данными для каждого профиля
const profilesData = {
    'rot-mitt': {
        image: 'images/rot-mitt-full-size.jpg',
        name: 'Rot Mitt',
        description1: 'Consequuntur est accusantium et nemo. Similique quo atque ut eligendi aspernatur modi ut nemo dolorem.',
        description2: 'Quod suscipit et sapiente et explicabo itaque molestiae laudantium architecto.',
        social: {
            medium: 'images/medium-modal-icon.svg',
            instagram: 'images/instagram-modal-icon.svg',
            linkedin: 'images/linkedin-modal-icon.png'
        },
        quote: '“Consequuntur est accusantium et nemo. Similique quo atque ut eligendi”'
    },
    // Другие профили можно добавить здесь по аналогии
    // 'vicky-russ': { ... }
};

// Функция для открытия модального окна с соответствующими данными
function openModal(profileKey) {
    const modal = document.getElementById('profile-modal');
    const profile = profilesData[profileKey];

    if (profile) {
        document.getElementById('modal-image').src = profile.image;
        document.getElementById('modal-name').innerText = profile.name;
        document.getElementById('modal-description-1').innerText = profile.description1;
        document.getElementById('modal-description-2').innerText = profile.description2;
        document.getElementById('social-medium').querySelector('img').src = profile.social.medium;
        document.getElementById('social-instagram').querySelector('img').src = profile.social.instagram;
        document.getElementById('social-linkedin').querySelector('img').src = profile.social.linkedin;
        document.getElementById('modal-quote').innerText = profile.quote;

        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('profile-modal');
    modal.style.display = 'none';
}

// Добавляем событие на все кнопки "View profile"
document.querySelectorAll('.profile-card-view').forEach(button => {
    button.addEventListener('click', function () {
        // Получаем имя профиля из родительского элемента и преобразуем его в нижний регистр без пробелов
        const profileName = button.parentElement.querySelector('.profile-card-title').innerText.toLowerCase().replace(' ', '-');
        openModal(profileName);
    });
});

function preloadImages() {
    Object.values(profilesData).forEach(profile => {
        const img = new Image();
        img.src = profile.image;

        // Также предварительно загружаем изображения соцсетей, если они большие
        Object.values(profile.social).forEach(socialImage => {
            const socialImg = new Image();
            socialImg.src = socialImage;
        });
    });
}