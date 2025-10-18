import React from "react";

/**
 * props:
 * - variant: "default" | "primary" | "outline" | "ghost"
 * - size: "sm" | "md" (по умолчанию md)
 * - loading: boolean (показывает спиннер)
 * - fullWidth: boolean (растянуть на 100%)
 * - as: "button" | "a"
 */
export default function Button({
                                   as = "button",
                                   variant = "default",
                                   size = "md",
                                   loading = false,
                                   disabled,
                                   fullWidth = false,
                                   className = "",
                                   children,
                                   ...props
                               }) {
    const cls = ["btn"];
    if (variant === "primary") cls.push("primary");
    if (variant === "outline") cls.push("outline");
    if (variant === "ghost") cls.push("ghost");
    if (size === "sm") cls.push("btn-sm");
    if (fullWidth) cls.push("btn-block");
    if (loading) cls.push("is-loading");
    if (className) cls.push(className);

    const content = (
        <>
            {loading && <span className="btn-spinner" aria-hidden="true" />}
            <span className="btn-label">{children}</span>
        </>
    );

    if (as === "a") {
        return (
            <a className={cls.join(" ")} aria-busy={loading} aria-disabled={disabled || loading} {...props}>
                {content}
            </a>
        );
    }

    return (
        <button
            className={cls.join(" ")}
            disabled={disabled || loading}
            aria-busy={loading}
            {...props}
        >
            {content}
        </button>
    );
}
