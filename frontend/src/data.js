const data = {
    brand: {
        name: "Кофе и Книги",
        tagline: "Гармоничное пространство кофе и литературы",
    },
    hero: [
        { img: "/images/coffee.webp", title: "Авторские эспрессо и фильтр", subtitle: "Выберите своё зерно и степень обжарки", cta: "Посмотреть меню" },
        { img: "/images/vechera.jpg", title: "Книжные вечера и встречи", subtitle: "Афиша событий на этой неделе", cta: "Расписание" },
        { img: "/images/desert.jpg", title: "Десерты к кофе", subtitle: "Свежая выпечка ежедневно", cta: "Сладкое меню" },
    ],
    menu: [
        { id: 1, img: "/images/espress.jpg" , title: "Эспрессо", price: "150 ₽", desc: "Двойной шот, насыщенный вкус", category: "Кофе", tags: [] },
        { id: 2, img: "/images/Кофе-для-латте.jpg", title: "Капучино", price: "220 ₽", desc: "Классика на молоке", category: "Кофе", tags: ["Безлактозное"] },
        { id: 3, img: "/images/fish.jpg", title: "Флэт уайт", price: "230 ₽", desc: "Мягкая молочная текстура", category: "Кофе", tags: ["Безлактозное"] },
        { id: 4, img: "/images/foto-3646-15.jpg", title: "V60", price: "260 ₽", desc: "Фильтр-метод, чистый вкус", category: "Кофе", tags: [] },
        { id: 5, img: "/images/desert1.jpg", title: "Чизкейк", price: "280 ₽", desc: "Кремовая текстура", category: "Десерты", tags: [] },
        { id: 6, img: "/images/desert5.jpeg", title: "Морковный торт", price: "260 ₽", desc: "Домашний рецепт", category: "Десерты", tags: ["Веганское"] },
        { id: 7, img: "/images/omlet3.jpg", title: "Боул завтрак", price: "320 ₽", desc: "Злаки, орехи и фрукты", category: "Завтраки", tags: ["Веганское", "Безлактозное"] },
        { id: 8, img: "/images/books.jpg", title: "Книга дня", price: "от 500 ₽", desc: "Подборка кавер-тайтлов", category: "Книги", tags: [] },
    ],
    events: [
        { category: "Встречи с авторами", title: "Творческая встреча с Леной Сокол", date: "18 октября", time: "11:30", place: "Библиотека им. Н.А. Некрасова", topic: "Как стать автором молодежных бестселлеров", format: "Открытая беседа с автором", requiresRegistration: false },
        { category: "Встречи с авторами", title: "Встреча с Асей Лавринович", date: "18 октября", time: "13:00", place: "Библиотека им. Н.А. Некрасова", topic: "О том, как писать истории о первой любви", format: "Беседа", requiresRegistration: true },
        { category: "Встречи с авторами", title: "Беседа с Ксенией Горбуновой", date: "18 октября", time: "13:00", place: "ЦМДБ им. М. Горького", topic: "Где рождаются добрые истории", format: "Беседа", requiresRegistration: false },

        { category: "Мастер-классы", title: "Мастер-класс «Осенняя закладка для книг»", date: "18 октября", time: "18:00", place: "—", topic: "Творческие мастерские", format: "Практический мастер-класс", organizer: "Арт-мастерская", requiresRegistration: false },
        { category: "Мастер-классы", title: "Мастер-класс «Ручка-перо»", date: "19 октября", time: "14:30", place: "Библиотека им. Н.А. Некрасова", topic: "Изящное письмо", format: "Практический мастер-класс", requiresRegistration: false },
        { category: "Мастер-классы", title: "Мастер-класс «Ёжик идёт в гости»", date: "19 октября", time: "11:00", place: "—", topic: "Творческая мастерская для детей", format: "Практический мастер-класс", requiresRegistration: true },

        { category: "Литературные мероприятия", title: "Презентация альманаха «Действующие лица»", date: "18 октября", time: "14:30", place: "—", topic: "Ведущая — писательница Евгения Некрасова", format: "Презентация", requiresRegistration: false },
        { category: "Литературные мероприятия", title: "Литературный праздник", date: "—", time: "15:00", place: "ЦМДБ им. М. Горького", topic: "Подведение итогов конкурса, награждение победителей", format: "Праздничная программа", requiresRegistration: false },
    ],
    reviews: [
        { name: "Марина", text: "Зашла спонтанно — уютная атмосфера, приятная музыка. Бариста помогла с выбором, раф с карамелью — божественный. Обязательно вернусь!", rating: 5 },
        { name: "Ольга", text: "Хожу почти каждый день. Бариста помнит мои предпочтения и готовит идеальный эспрессо. Чисто, удобно работать, цены адекватные.", rating: 5 },
        { name: "Сергей", text: "Праздновали день рождения: внимательный персонал, быстрый сервис. Напитки от капучино до бамбла — превосходны, торт — отличный.", rating: 5 },
    ],
    contacts: {
        address: "г. Калуга, ул. Автозаводская, 15",
        hours: "пн–пт: 08:00–19:00; сб–вс: 08:00–16:00",
        phone: "8-956-123-00-05",
        email: "KofeiKnigi@mail.ru",
        mapLink: "#",
        facadeImg: "/images/map1.webp",
        socials: [
            { label: "Instagram", href: "#" },
            { label: "Telegram", href: "#" },
        ],
    },
};

export default data;
