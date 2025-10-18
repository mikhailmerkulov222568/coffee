import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Registration from '../models/Registration.js';
import { sendRegistrationMail } from '../utils/mailer.js';

const router = Router();

/**
 * POST /api/registrations
 * body: { eventTitle, date, time, place, name, phone, email?, requiresRegistration? }
 */
router.post(
    '/',
    body('eventTitle').trim().notEmpty().withMessage('eventTitle is required'),
    body('name').trim().notEmpty().withMessage('name is required'),
    body('phone').trim().isLength({ min: 6 }).withMessage('phone is required'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('invalid email'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const payload = req.body;
            const doc = await Registration.create(payload);

            // Email заявителю (если указан)
            if (payload.email) {
                await sendRegistrationMail({
                    to: payload.email,
                    subject: `Запись на событие: ${payload.eventTitle}`,
                    html: `
            <p>Спасибо за регистрацию!</p>
            <p><b>Событие:</b> ${payload.eventTitle}</p>
            <p><b>Когда:</b> ${payload.date || ''} ${payload.time ? '• ' + payload.time : ''}</p>
            <p><b>Где:</b> ${payload.place || ''}</p>
            <p>Мы свяжемся с вами для подтверждения.</p>
          `
                }).catch(() => {});
            }

            // (опционально) письмо админу — можно добавить переменную ADMIN_EMAIL

            res.status(201).json({ ok: true, id: doc._id });
        } catch (e) {
            next(e);
        }
    }
);

/** (опционально) список регистраций для админки */
router.get('/', async (_req, res, next) => {
    try {
        const list = await Registration.find().sort({ createdAt: -1 }).limit(100);
        res.json({ items: list });
    } catch (e) {
        next(e);
    }
});

export default router;
