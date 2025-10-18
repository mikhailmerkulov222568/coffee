import React from "react";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.jsx";
import Modal from "../components/ui/Modal.jsx";
import {API_BASE} from "../api.js";

export default function Events() {
    const [openId, setOpenId] = React.useState(null);       // для "Подробнее"
    const [regOpen, setRegOpen] = React.useState(false);    // модалка
    const [selected, setSelected] = React.useState(null);   // выбранное событие
    const [form, setForm] = React.useState({ name:"", phone:"", email:"" });
    const [sending, setSending] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    function toggleDetails(idx){ setOpenId(prev => prev===idx ? null : idx); }

    function openRegister(eItem){
        setSelected(eItem);
        setForm({ name:"", phone:"", email:"" });
        setSuccess(false);
        setRegOpen(true);
    }

    function validate(){
        if (!form.name.trim()) return "Введите имя";
        if (!/^\+?\d[\d\s\-()]{6,}$/.test(form.phone.trim())) return "Укажите телефон";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Некорректный email";
        return null;
    }

    async function submitReg(e){
        e.preventDefault();
        const err = validate();
        if (err){ alert(err); return; }
        setSending(true);

        try {
            const res = await fetch(`${API_BASE}/api/registrations`, {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify({
                    eventTitle: selected?.title,
                    date: selected?.date,
                    time: selected?.time,
                    place: selected?.place,
                    requiresRegistration: !!selected?.requiresRegistration,
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim() || undefined
                })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Ошибка отправки');
            }
            setSuccess(true); // покажем экран "успех"
        } catch (e) {
            alert(e.message || 'Не удалось отправить заявку');
        } finally {
            setSending(false);
        }
    }

    return (
        <main className="section">
            <div className="container">
                <h2>Анонсы культурных событий</h2>
                <p className="subtitle">Встречи с авторами, мастер-классы и литературные мероприятия</p>

                <div className="events-grid mt-16">
                    {data.events.map((eItem, i) => {
                        const opened = openId === i;
                        return (
                            <Card key={i} className="event-card">
                                <CardHeader>
                                    <CardTitle>{eItem.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="meta">{eItem.category}</div>

                                    <div className="row"><strong>Дата/время:</strong> {eItem.date}{eItem.time ? ` • ${eItem.time}` : ""}</div>
                                    <div className="row"><strong>Место:</strong> {eItem.place}</div>

                                    {/* раскрывающийся блок "Подробнее" */}
                                    <div style={{marginTop:8}}>
                                        <Button variant="ghost" size="sm" onClick={()=>toggleDetails(i)}>
                                            {opened ? "Скрыть подробности" : "Подробнее"}
                                        </Button>
                                        {opened && (
                                            <div className="text-sm" style={{marginTop:8}}>
                                                {eItem.topic && <div className="row"><strong>Тема:</strong> {eItem.topic}</div>}
                                                {eItem.format && <div className="row"><strong>Формат:</strong> {eItem.format}</div>}
                                                {eItem.organizer && <div className="row"><strong>Организатор:</strong> {eItem.organizer}</div>}
                                                {eItem.requiresRegistration && (
                                                    <div className="mt-12">
                                                        <span className="pill warn">Важно: требуется предварительная регистрация</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="event-actions">
                                        <Button variant="primary" onClick={()=>openRegister(eItem)}>Записаться</Button>
                                        <Button variant="outline" onClick={()=>toggleDetails(i)}>
                                            {opened ? "Скрыть" : "Подробнее"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Модалка «Записаться» */}
            <Modal
                open={regOpen}
                onClose={()=>setRegOpen(false)}
                title={selected ? `Запись: ${selected.title}` : "Запись на событие"}
                footer={
                    !success ? (
                        <>
                            <Button variant="ghost" onClick={()=>setRegOpen(false)}>Отмена</Button>
                            <Button variant="primary" loading={sending} form="regForm" type="submit">Отправить</Button>
                        </>
                    ) : (
                        <Button variant="primary" onClick={()=>setRegOpen(false)}>Готово</Button>
                    )
                }
            >
                {!success ? (
                    <form id="regForm" onSubmit={submitReg} className="reg-grid">
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
                            <label className="text-sm">Телефон</label>
                            <input
                                type="tel"
                                placeholder="+7 ..."
                                value={form.phone}
                                onChange={e=>setForm({...form, phone:e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm">Email (необязательно)</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={e=>setForm({...form, email:e.target.value})}
                            />
                        </div>
                        {/* для красоты можно вывести резюме события */}
                        {selected && (
                            <div className="pill" style={{marginTop:6}}>
                                {selected.date}{selected.time ? ` • ${selected.time}` : ""} • {selected.place}
                            </div>
                        )}
                    </form>
                ) : (
                    <div className="text-sm">
                        <p><strong>Спасибо!</strong> Ваша заявка принята. Мы свяжемся с вами для подтверждения.</p>
                        {selected && (
                            <p className="subtitle" style={{marginTop:8}}>
                                Событие: {selected.title} — {selected.date}{selected.time ? ` • ${selected.time}` : ""}, {selected.place}
                            </p>
                        )}
                    </div>
                )}
            </Modal>
        </main>
    );
}
