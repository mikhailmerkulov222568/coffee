import React from "react";

export default function Modal({ open, onClose, title, children, footer }) {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
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
