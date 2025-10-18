// backend/src/utils/mailer.js
import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;

let transporter = null;

// Если SMTP-параметры заданы — создаём транспорт, иначе будет no-op
if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
}

/**
 * Универсальная обёртка: если транспорта нет — просто ничего не делаем.
 */
export async function sendRegistrationMail({ to, subject, html }) {
    if (!transporter || !to) return { skipped: true };
    const info = await transporter.sendMail({
        from: MAIL_FROM || 'no-reply@coffee-books.kg',
        to,
        subject,
        html
    });
    return { messageId: info.messageId };
}
