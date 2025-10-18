import React from "react";
import { API_BASE } from "../api.js";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";

export default function ReviewsSection() {
    const [list, setList] = React.useState([]);
    const [nextCursor, setNextCursor] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [sending, setSending] = React.useState(false);
    const [form, setForm] = React.useState({ name: "", text: "", rating: 5 });

    const localItems = (Array.isArray(data?.reviews) ? data.reviews : []).map((r, i) => ({
        _id: `local-${i}`,
        source: "local",
        ...r,
    }));

    // Утилита: объединить и убрать дубли по name|text
    const mergeUnique = (arr) => {
        const seen = new Set();
        const out = [];
        for (const r of arr) {
            const key = `${(r.name || "").trim()}|${(r.text || "").trim()}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push(r);
        }
        return out;
    };

    async function loadMore(initial = false) {
        setLoading(true);
        try {
            const url = new URL(`${API_BASE}/api/reviews`);
            url.searchParams.set("limit", 6);
            if (!initial && nextCursor) url.searchParams.set("cursor", nextCursor);

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const payload = await res.json();
            const apiItems = Array.isArray(payload.items) ? payload.items.map((r) => ({ ...r, source: "api" })) : [];

            if (initial) {
                // Рисуем ВМЕСТЕ: локальные + серверные
                setList(mergeUnique([...localItems, ...apiItems]));
            } else {
                setList((prev) => mergeUnique([...prev, ...apiItems]));
            }
            setNextCursor(payload.nextCursor || null);
        } catch (e) {
            console.error(e);
            if (initial) {
                // Если API упал — всё равно рисуем локальные
                setList(mergeUnique([...localItems]));
                setNextCursor(null);
            }
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => { loadMore(true); }, []);

    async function onSubmit(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.text.trim()) return alert("Заполните имя и отзыв");
        setSending(true);
        try {
            const res = await fetch(`${API_BASE}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    text: form.text.trim(),
                    rating: Number(form.rating) || 5,
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            const { item } = await res.json();
            // Показать сразу вместе со всеми
            setList((prev) => mergeUnique([{ ...item, source: "api" }, ...prev]));
            setForm({ name: "", text: "", rating: 5 });
        } catch (e) {
            // Даже если бек не принял — добавим локально, чтобы пользователь видел
            setList((prev) =>
                mergeUnique([{ _id: `local-new-${Date.now()}`, source: "local", ...form }, ...prev])
            );
            alert("Не удалось отправить на сервер, отзыв сохранён локально до перезагрузки");
            console.error(e);
        } finally {
            setSending(false);
        }
    }

    const renderStars = (raw) => {
        const r = Math.max(1, Math.min(5, Number(raw) || 5));
        return (
            <>
                {"★".repeat(r)}
                {"☆".repeat(5 - r)}
            </>
        );
    };

    return (
        <section className="section alt-3" id="reviews">
            <div className="container">
                <h2>Отзывы</h2>
                <p className="subtitle">Оставьте впечатление о кофе, десертах и книжных вечерах</p>

                <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: 16, alignItems: "start" }}>
                    {/* Лента отзывов */}
                    <div className="grid grid-3">
                        {list.map((r) => (
                            <Card key={r._id || `${r.source}-${r.name}-${r.text.slice(0, 20)}`}>
                                <CardContent>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                                        <div className="text-sm" aria-label={`Оценка ${r.rating} из 5`}>
                                            {renderStars(r.rating)}
                                        </div>
                                    </div>
                                    <div className="subtitle mt-12" style={{ whiteSpace: "pre-wrap" }}>{r.text}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Форма отзыва */}
                    <div>
                        <Card>
                            <CardContent>
                                <h3 style={{ marginBottom: 10 }}>Оставить отзыв</h3>
                                <form className="grid" style={{ gap: 10 }} onSubmit={onSubmit}>
                                    <div>
                                        <label className="text-sm">Имя</label>
                                        <input
                                            type="text"
                                            placeholder="Ваше имя"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm">Оценка</label>
                                        <select
                                            value={form.rating}
                                            onChange={(e) => setForm({ ...form, rating: e.target.value })}
                                        >
                                            {[5, 4, 3, 2, 1].map((n) => (
                                                <option key={n} value={n}>{n}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm">Ваш отзыв</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Что вам понравилось?"
                                            value={form.text}
                                            onChange={(e) => setForm({ ...form, text: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" loading={sending} fullWidth>Отправить</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
