import React from "react";

export default function Button({ as = "button", variant = "default", className = "", children, ...props }) {
    const base = "btn";
    const map = { default: "", outline: "", primary: "primary", secondary: "secondary" };
    const cls = [base, map[variant] || "" , className].join(" ").trim();

    if (as === "a") {
        return <a className={cls} {...props}>{children}</a>;
    }
    return <button className={cls} {...props}>{children}</button>;
}
