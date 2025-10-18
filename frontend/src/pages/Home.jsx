import React from "react";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";

// если уже есть файл src/api.js, импортируй из него:
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:4000";

// Простейшая модалка (если у тебя уже есть components/ui/Modal.jsx — можно заменить и использовать её)
function Modal({ open, onClose, title, children, footer }) {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-head">
                    <div className="modal-title">{title}</div>
                    <button className="modal-close" onClick={onClose} aria-label="Закрыть">×</button>
                </div>
                <div className="modal-body">{children}</div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}

export default function Home() {
    // состояние модалки отзывов
    const [openReview, setOpenReview] = React.useState(false);
    const [sending, setSending] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [form, setForm] = React.useState({ name: "", rating: 5, text: "" });

    async function submitReview(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.text.trim()) {
            alert("Заполните имя и отзыв");
            return;
        }
        setSending(true);
        try {
            const res = await fetch(`${API_BASE}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    text: form.text.trim(),
                    rating: Number(form.rating) || 5
                })
            });
            if (!res.ok) throw new Error(await res.text());
            setSuccess(true);
            // Также можно оптимистично добавить отзыв в превью:
            // data.reviews.unshift({ name: form.name, text: form.text, rating: Number(form.rating)||5 });
            setForm({ name:"", rating:5, text:"" });
        } catch (err) {
            alert("Не удалось отправить отзыв");
            console.error(err);
        } finally {
            setSending(false);
        }
    }

    return (
        <main>
            {/* Hero */}
            <section className="section">
                <div className="container" style={{display:"grid", gap:24, gridTemplateColumns:"1fr", alignItems:"center"}}>
                    <div>
                        <h1 style={{fontSize:36, margin:"0 0 8px"}}>{data.brand.tagline}</h1>
                        <p className="subtitle">
                            Наша кофейня — гармоничное пространство, где каждый гость может погрузиться в мир любимых книг за чашечкой ароматного кофе, наслаждаясь атмосферой спокойствия и умиротворения.
                            <br/><br/>
                            Уютные кресла, тщательно подобранная коллекция литературы и безупречный кофе создают особую атмосферу, где время словно замедляется, позволяя отвлечься от суеты и погрузиться в чтение.
                        </p>
                        <div style={{display:"flex", gap:10, marginTop:12}}>
                            <Button as="a" href="/menu" className="primary">Посмотреть меню</Button>
                            <Button as="a" href="/events">Афиша событий</Button>
                        </div>
                    </div>
                    <div className="grid grid-3">
                        {data.hero.map((s, i) => (
                            <div key={i} className="card">
                                <div className="media"><img src={s.img} alt={s.title} /></div>
                                <div className="p-3">
                                    <div style={{fontWeight:600, fontSize:14}}>{s.title}</div>
                                    <div className="subtitle" style={{fontSize:12}}>{s.subtitle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Меню превью */}
            <section className="section">
                <div className="container">
                    <h2 style={{fontSize:28, margin:"0 0 8px"}}>Меню</h2>
                    <div className="grid grid-3">
                        {data.menu.slice(0,6).map(m => (
                            <Card key={m.id}>
                                <CardContent className="p-0">
                                    <div className="media"><img src={m.img} alt={m.title} /></div>
                                    <div className="p-4">
                                        <div style={{display:"flex", justifyContent:"space-between"}}>
                                            <strong>{m.title}</strong>
                                            <strong>{m.price}</strong>
                                        </div>
                                        <div className="subtitle" style={{fontSize:14, marginTop:6}}>{m.desc}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div style={{marginTop:12}}>
                        <Button as="a" href="/menu">Полное меню</Button>
                    </div>
                </div>
            </section>

            {/* События превью */}
            <section className="section alt-1">
                <div className="container">
                    <h2 style={{fontSize:28, margin:"0 0 8px"}}>Анонсы культурных событий</h2>
                    <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
                        {data.events.slice(0,4).map((e, i)=>(
                            <Card key={i}>
                                <CardContent>
                                    <strong>{e.title}</strong>
                                    <div className="subtitle" style={{fontSize:14, marginTop:6}}>
                                        {e.category} • {e.date}{e.time?` • ${e.time}`:""} • {e.place}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div style={{marginTop:12}}>
                        <Button as="a" href="/events">Все события</Button>
                    </div>
                </div>
            </section>

            {/* Отзывы превью */}
            <ReviewsSection/>
            {/* Модалка "Оставить отзыв" */}
            <Modal
                open={openReview}
                onClose={()=>setOpenReview(false)}
                title="Оставить отзыв"
                footer={
                    !success ? (
                        <>
                            <Button variant="ghost" onClick={()=>setOpenReview(false)}>Отмена</Button>
                            <Button variant="primary" loading={sending} form="reviewForm" type="submit">Отправить</Button>
                        </>
                    ) : (
                        <Button variant="primary" onClick={()=>setOpenReview(false)}>Готово</Button>
                    )
                }
            >
                {!success ? (
                    <form id="reviewForm" onSubmit={submitReview} className="grid" style={{gap:10}}>
                        <div>
                            <label className="text-sm">Имя</label>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                value={form.name}
                                onChange={e=>setForm({...form, name:e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm">Оценка</label>
                            <select
                                value={form.rating}
                                onChange={e=>setForm({...form, rating:e.target.value})}
                            >
                                {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm">Ваш отзыв</label>
                            <textarea
                                rows={5}
                                placeholder="Что вам понравилось?"
                                value={form.text}
                                onChange={e=>setForm({...form, text:e.target.value})}
                                required
                            />
                        </div>
                    </form>
                ) : (
                    <div className="text-sm">
                        <p><strong>Спасибо!</strong> Ваш отзыв отправлен и будет опубликован.</p>
                    </div>
                )}
            </Modal>
        </main>
    );
}
