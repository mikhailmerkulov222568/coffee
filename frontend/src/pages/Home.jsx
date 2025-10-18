import React from "react";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";
import { Link } from "react-router-dom";

export default function Home() {
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
            <section className="section alt-3" style={{background:"#f8f9fb"}}>
                <div className="container">
                    <h2 style={{fontSize:28, margin:"0 0 8px"}}>Отзывы</h2>
                    <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
                        {data.reviews.slice(0,2).map((r,i)=>(
                            <Card key={i}><CardContent>
                                <div style={{fontWeight:600}}>{r.name}</div>
                                <div className="subtitle" style={{fontSize:14, marginTop:6}}>{r.text}</div>
                            </CardContent></Card>
                        ))}
                    </div>
                    <div style={{marginTop:12}}>
                        <Button as="a" href="/contacts">Связаться с нами</Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
