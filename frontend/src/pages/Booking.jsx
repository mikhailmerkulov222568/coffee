import React from "react";
import Button from "../components/ui/Button.jsx";

export default function Booking() {
    function onSubmit(e){
        e.preventDefault();
        alert("Заявка отправлена (демо).");
    }
    return (
        <main className="section" style={{background:"linear-gradient(#fff,#f8f9fb)"}}>
            <div className="container" style={{maxWidth:720}}>
                <h1 style={{fontSize:28, margin:"0 0 12px"}}>Забронировать столик</h1>
                <p className="subtitle" style={{marginBottom:16}}>Подтверждение — на e-mail/SMS (демо-фронт).</p>
                <form onSubmit={onSubmit} style={{display:"grid", gap:12}}>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12}}>
                        <div><label className="subtitle" style={{fontSize:14}}>Дата</label><input type="date"/></div>
                        <div><label className="subtitle" style={{fontSize:14}}>Время</label><input type="time"/></div>
                        <div><label className="subtitle" style={{fontSize:14}}>Гостей</label><input type="number" min={1} defaultValue={2}/></div>
                    </div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12}}>
                        <div><label className="subtitle" style={{fontSize:14}}>Имя</label><input type="text" placeholder="Ваше имя"/></div>
                        <div><label className="subtitle" style={{fontSize:14}}>Телефон</label><input type="tel" placeholder="+996 ..."/></div>
                        <div><label className="subtitle" style={{fontSize:14}}>Email</label><input type="email" placeholder="you@example.com"/></div>
                    </div>
                    <Button className="primary" type="submit">Отправить заявку</Button>
                </form>
            </div>
        </main>
    );
}
