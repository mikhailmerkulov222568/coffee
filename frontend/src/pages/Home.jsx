"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.jsx";

// Если у вас нет alias "@/..." — замените импорты на:
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const data = {
    brand: {
        name: "Кофе и Книги",
        tagline: "Гармоничное пространство кофе и литературы",
    },
    hero: [
        { img: "/images/hero-1.jpg", title: "Авторские эспрессо и фильтр", subtitle: "Выберите своё зерно и степень обжарки", cta: "Посмотреть меню" },
        { img: "/images/hero-1.jpg", title: "Книжные вечера и встречи", subtitle: "Афиша событий на этой неделе", cta: "Расписание" },
        { img: "/images/hero-1.jpg", title: "Десерты к кофе", subtitle: "Свежая выпечка ежедневно", cta: "Сладкое меню" },
    ],
    menu: [
        { id: 1, img: "/images/hero-1.jpg", title: "Эспрессо", price: "150 ₽", desc: "Двойной шот, насыщенный вкус", category: "Кофе", tags: [] },
        { id: 2, img: "/images/hero-1.jpg", title: "Капучино", price: "220 ₽", desc: "Классика на молоке", category: "Кофе", tags: ["Безлактозное"] },
        { id: 3, img: "/images/hero-1.jpg", title: "Флэт уайт", price: "230 ₽", desc: "Мягкая молочная текстура", category: "Кофе", tags: ["Безлактозное"] },
        { id: 4, img: "/images/hero-1.jpg", title: "V60", price: "260 ₽", desc: "Фильтр-метод, чистый вкус", category: "Кофе", tags: [] },
        { id: 5, img: "/images/hero-1.jpg", title: "Чизкейк", price: "280 ₽", desc: "Кремовая текстура", category: "Десерты", tags: [] },
        { id: 6, img: "/images/hero-1.jpg", title: "Морковный торт", price: "260 ₽", desc: "Домашний рецепт", category: "Десерты", tags: ["Веганское"] },
        { id: 7, img: "/images/hero-1.jpg", title: "Боул завтрак", price: "320 ₽", desc: "Злаки, орехи и фрукты", category: "Завтраки", tags: ["Веганское", "Безлактозное"] },
        { id: 8, img: "/images/hero-1.jpg", title: "Книга дня", price: "от 500 ₽", desc: "Подборка кавер-тайтлов", category: "Книги", tags: [] },
    ],
    // Взято из вашего сообщения "строго по ТЗ"
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
        facadeImg: "/images/hero-1.jpg",
        socials: [
            { label: "Instagram", href: "#" },
            { label: "Telegram", href: "#" },
        ],
    },
};

function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-black/80 text-white grid place-items-center font-semibold">K</div>
                    <div className="font-semibold text-lg">{data.brand.name}</div>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <a href="#menu" className="hover:opacity-70">Меню</a>
                    <a href="#books" className="hover:opacity-70">Книги</a>
                    <a href="#events" className="hover:opacity-70">События</a>
                    <a href="#reviews" className="hover:opacity-70">Отзывы</a>
                    <a href="#reservation" className="hover:opacity-70">Бронирование</a>
                    <a href="#contacts" className="hover:opacity-70">Контакты</a>
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden md:inline-flex">Поиск</Button>
                    <Button>Заказать</Button>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-bold leading-tight">
                        {data.brand.tagline}
                    </motion.h1>
                    <p className="mt-4 text-gray-500 max-w-prose">
                        Наша кофейня — гармоничное пространство, где каждый гость может погрузиться в мир любимых книг за чашечкой ароматного кофе, наслаждаясь атмосферой спокойствия и умиротворения.
                        <br /><br />
                        Уютные кресла, тщательно подобранная коллекция литературы и безупречный кофе создают особую атмосферу, где время словно замедляется, позволяя отвлечься от суеты и погрузиться в чтение.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button asChild><a href="#menu">Посмотреть меню</a></Button>
                        <Button variant="outline" asChild><a href="#events">Афиша событий</a></Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {data.hero.map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow">
                            <div className="aspect-[4/5] bg-gray-100">
                                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3">
                                <div className="font-medium text-sm">{s.title}</div>
                                <div className="text-xs text-gray-500">{s.subtitle}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SectionTitle({ icon, title, subtitle, id }: { icon?: React.ReactNode, title: string, subtitle?: string, id?: string }) {
    return (
        <div id={id} className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            </div>
            {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
        </div>
    );
}

function MenuPreview() {
    const categories = Array.from(new Set(data.menu.map(m => m.category)));
    const [activeCat, setActiveCat] = React.useState<string>("Все");
    const [tag, setTag] = React.useState<string>("Все");
    const tagsAll = Array.from(new Set(data.menu.flatMap(m => m.tags)));
    const filtered = data.menu.filter(m => (activeCat === "Все" || m.category === activeCat) && (tag === "Все" || m.tags.includes(tag)));
    return (
        <section className="py-10" id="menu">
            <SectionTitle title="Меню" subtitle="Категории и фильтры" />
            <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-2 mb-4">
                <Button variant={activeCat === "Все" ? "default" : "outline"} onClick={() => setActiveCat("Все")}>Все</Button>
                {categories.map(c => (
                    <Button key={c} variant={activeCat === c ? "default" : "outline"} onClick={() => setActiveCat(c)}>{c}</Button>
                ))}
                <div className="grow" />
                <select className="border rounded-xl px-3 py-2" value={tag} onChange={e => setTag(e.target.value)}>
                    <option>Все</option>
                    {tagsAll.map(t => (<option key={t}>{t}</option>))}
                </select>
            </div>
            <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((m) => (
                    <Card key={m.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="aspect-[4/3] bg-gray-100">
                                <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium">{m.title}</div>
                                    <div className="font-semibold">{m.price}</div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">{m.desc}</div>
                                {m.tags.length > 0 && (
                                    <div className="mt-2 text-xs text-gray-500">{m.tags.join(" • ")}</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function BooksPreview() {
    return (
        <section className="py-10 bg-gray-50" id="books">
            <SectionTitle title="Книжная полка" subtitle="Если книги продаются — добавим каталог" />
            <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.booksPreview.map((b, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="aspect-[4/3] bg-gray-100">
                                <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <div className="font-medium">{b.title}</div>
                                <div className="text-sm text-gray-500">{b.author}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function Events() {
    return (
        <section className="py-10" id="events">
            <SectionTitle title="Анонсы культурных событий" subtitle="Встречи с авторами, мастер-классы и литературные мероприятия" />
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
                {data.events.map((e, i) => (
                    <Card key={i} className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>{e.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-500">
                            <div className="mb-1"><span className="font-medium text-gray-900">Категория:</span> {e.category}</div>
                            {e.topic && (<div className="mb-1"><span className="font-medium text-gray-900">Тема:</span> {e.topic}</div>)}
                            {e.format && (<div className="mb-1"><span className="font-medium text-gray-900">Формат:</span> {e.format}</div>)}
                            <div className="mb-1"><span className="font-medium text-gray-900">Дата/время:</span> {e.date}{e.time ? ` • ${e.time}` : ""}</div>
                            <div className="mb-1"><span className="font-medium text-gray-900">Место:</span> {e.place}</div>
                            {e.organizer && (<div className="mb-1"><span className="font-medium text-gray-900">Организатор:</span> {e.organizer}</div>)}
                            {e.requiresRegistration && (
                                <div className="mt-2 text-amber-700">Важно: требуется предварительная регистрация</div>
                            )}
                            <div className="mt-4 flex gap-3">
                                <Button size="sm">Записаться</Button>
                                <Button size="sm" variant="outline">Подробнее</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function Reviews() {
    const [list, setList] = React.useState(data.reviews);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as any;
        const name = form.name.value?.trim();
        const text = form.text.value?.trim();
        if (!name || !text) return;
        setList([{ name, text, rating: 5 }, ...list]);
        form.reset();
    }
    return (
        <section className="py-10 bg-gray-50" id="reviews">
            <SectionTitle title="Отзывы" subtitle="Оставьте впечатление о кофе, десертах и книжных вечерах" />
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid gap-4">
                    {list.map((r, i) => (
                        <Card key={i}>
                            <CardContent>
                                <div className="font-medium">{r.name}</div>
                                <div className="text-sm text-gray-500 mt-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                                <div className="mt-2 text-sm">{r.text}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Оставить отзыв</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-3" onSubmit={handleSubmit}>
                                <div className="grid gap-1">
                                    <label className="text-sm">Имя</label>
                                    <input name="name" className="border rounded-xl px-3 py-2" placeholder="Ваше имя" />
                                </div>
                                <div className="grid gap-1">
                                    <label className="text-sm">Ваш отзыв</label>
                                    <textarea name="text" rows={4} className="border rounded-xl px-3 py-2" placeholder="Что вам понравилось?" />
                                </div>
                                <Button type="submit" className="w-full">Отправить</Button>
                                <div className="text-xs text-gray-500">Отправка без бэкенда: отзыв появляется локально (демо-фронт).</div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

function Reservation() {
    return (
        <section className="py-12 bg-gradient-to-b from-white to-gray-50" id="reservation">
            <SectionTitle title="Забронировать столик" subtitle="Подтверждение — на e-mail/SMS (демо-фронт)" />
            <div className="max-w-3xl mx-auto px-4">
                <Card>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm">Дата</label>
                            <input type="date" className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm">Время</label>
                            <input type="time" className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm">Гостей</label>
                            <input type="number" min={1} defaultValue={2} className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm">Имя</label>
                            <input type="text" placeholder="Ваше имя" className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm">Телефон</label>
                            <input type="tel" placeholder="+996 ..." className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm">Email</label>
                            <input type="email" placeholder="you@example.com" className="border rounded-xl px-3 py-2" />
                        </div>
                        <div className="md:col-span-3">
                            <Button className="w-full">Отправить заявку</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function Contacts() {
    return (
        <section className="py-12 bg-black text-white" id="contacts">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-semibold mb-3">Контакты</h3>
                    <div className="text-sm opacity-90">Адрес: {data.contacts.address}</div>
                    <div className="text-sm opacity-90 mt-1">График: {data.contacts.hours}</div>
                    <div className="text-sm opacity-90 mt-1">Тел.: {data.contacts.phone}</div>
                    <div className="text-sm opacity-90 mt-1">Email: {data.contacts.email}</div>
                    <div className="flex gap-3 mt-3 text-sm">
                        {data.contacts.socials.map(s => (<a key={s.label} href={s.href} className="underline" target="_blank" rel="noreferrer">{s.label}</a>))}
                    </div>
                    <div className="mt-4">
                        <Button variant="secondary" asChild>
                            <a href={data.contacts.mapLink} target="_blank" rel="noreferrer">Открыть карту</a>
                        </Button>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden bg-white/10 aspect-video">
                    <img src={data.contacts.facadeImg} alt="Фасад кофейни" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header />
            <Hero />
            <MenuPreview />
            <BooksPreview />
            <Events />
            <Reviews />
            <Reservation />
            <Contacts />
            <footer className="border-t">
                <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
                    © {new Date().getFullYear()} Кофе и Книги. Все права защищены.
                </div>
            </footer>
        </div>
    );
}
