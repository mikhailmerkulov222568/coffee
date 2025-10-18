import React from "react";
import data from "../data.js";
import Button from "../components/ui/Button.jsx";
import { Card, CardContent } from "../components/ui/Card.jsx";

export default function Menu() {
    const categories = Array.from(new Set(data.menu.map(m=>m.category)));
    const [cat, setCat] = React.useState("Все");
    const tagsAll = Array.from(new Set(data.menu.flatMap(m=>m.tags)));
    const [tag, setTag] = React.useState("Все");

    const filtered = data.menu.filter(m =>
        (cat === "Все" || m.category === cat) &&
        (tag === "Все" || m.tags.includes(tag))
    );

    return (
        <main className="section">
            <div className="container">
                <h1 style={{fontSize:28, margin:"0 0 12px"}}>Меню</h1>
                <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:12}}>
                    <Button className={cat==="Все"?"primary":""} onClick={()=>setCat("Все")}>Все</Button>
                    {categories.map(c=>(
                        <Button key={c} className={cat===c?"primary":""} onClick={()=>setCat(c)}>{c}</Button>
                    ))}
                    <div style={{flex:"1 1 auto"}}/>
                    <select value={tag} onChange={e=>setTag(e.target.value)}>
                        <option>Все</option>
                        {tagsAll.map(t=><option key={t}>{t}</option>)}
                    </select>
                </div>

                <div className="grid grid-3">
                    {filtered.map(m=>(
                        <Card key={m.id}>
                            <CardContent className="p-0">
                                <div className="media"><img src={m.img} alt={m.title} /></div>
                                <div className="p-4">
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                        <strong>{m.title}</strong><strong>{m.price}</strong>
                                    </div>
                                    <div className="subtitle" style={{fontSize:14, marginTop:6}}>{m.desc}</div>
                                    {m.tags.length>0 && <div className="subtitle" style={{fontSize:12, marginTop:6}}>{m.tags.join(" • ")}</div>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
