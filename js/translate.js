document.addEventListener('DOMContentLoaded', function () {
    const langSelect = document.getElementById('currentLang');
    const selectedLang = document.getElementById('selectedLanguage');
    const langDropdown = document.getElementById('languageDropdown');
    const langOptions = langDropdown.querySelectorAll('.lang-option');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            // Получаем выбранный язык
            const selectedLanguage = option.dataset.lang;
            const selectedText = option.textContent.trim();
            const selectedFlag = option.querySelector('img').src;

            // Меняем текущий выбранный язык с флага и текста
            selectedLang.textContent = selectedText;
            const img = document.createElement('img');
            img.src = selectedFlag;
            img.alt = `${selectedText} language`;
            selectedLang.appendChild(img);

            // Перемещаем текущий язык в dropdown, заменяя на старый выбранный
            const currentLangText = langSelect.textContent.trim();
            const currentFlag = selectedLang.querySelector('img').src;

            option.innerHTML = `${currentLangText} <img src="${currentFlag}" alt="${currentLangText} language">`;

            // Теперь обновите сайт, чтобы он соответствовал выбранному языку
            changeLanguage(selectedLanguage);
        });
    });
});

function changeLanguage(lang) {
    // Пример использования JSON для перевода страницы
    // Сначала загрузите переводы для каждого языка
    const translations = {
        en: {
            about: "About us",
            products: "Products",
            how: "How we work",
            blog: "Blog",
            contact: "Contact"
        },
        es: {
            about: "Sobre nosotros",
            products: "Productos",
            how: "Cómo trabajamos",
            blog: "Blog",
            contact: "Contacto"
        },
        de: {
            about: "Über uns",
            products: "Produkte",
            how: "Wie wir arbeiten",
            blog: "Blog",
            contact: "Kontakt"
        }
    };

    // Обновление текстов на странице на основе выбранного языка
    document.querySelector('.menu-list a[href="about.html"]').textContent = translations[lang].about;
    document.querySelector('.menu-list a[href="#"]:nth-of-type(1)').textContent = translations[lang].products;
    document.querySelector('.menu-list a[href="#"]:nth-of-type(2)').textContent = translations[lang].how;
    document.querySelector('.menu-list a[href="#"]:nth-of-type(3)').textContent = translations[lang].blog;
    document.querySelector('.menu-list a[href="#"]:nth-of-type(4)').textContent = translations[lang].contact;
}