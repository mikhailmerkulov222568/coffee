import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">© {new Date().getFullYear()} Кофе и Книги. Все права защищены.</div>
        </footer>
    );
}
