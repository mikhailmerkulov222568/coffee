import React from "react";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";

export default function Contacts() {
    const c = data.contacts;
    return (
        <main className="section" style={{background:"#0b0b0c", color:"#fff"}}>
            <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"center"}}>
                <div>
                    <h1 style={{fontSize:28, margin:"0 0 12px"}}>Контакты</h1>
                    <div className="subtitle" style={{color:"#ddd"}}>Адрес: {c.address}</div>
                    <div className="subtitle" style={{color:"#ddd"}}>График: {c.hours}</div>
                    <div className="subtitle" style={{color:"#ddd"}}>Тел.: {c.phone}</div>
                    <div className="subtitle" style={{color:"#ddd"}}>Email: {c.email}</div>
                    <div style={{display:"flex", gap:10, marginTop:12}}>
                        {c.socials.map(s=>(
                            <a key={s.label} href={s.href} className="subtitle" style={{textDecoration:"underline", color:"#fff"}}>{s.label}</a>
                        ))}
                    </div>
                    <div style={{marginTop:12}}>
                        <Button as="a" href={c.mapLink} className="secondary">Открыть карту</Button>
                    </div>
                </div>
                <div className="aspect-video">
                    <img src={c.facadeImg} alt="Фасад кофейни"/>
                </div>
            </div>
        </main>
    );
}
