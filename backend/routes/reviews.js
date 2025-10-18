import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import Review from '../models/Review.js';

const router = Router();

/** GET /api/reviews?limit=20&cursor=<createdAt ISO>
 *  Пагинация по createdAt (обратная, свежие сверху)
 */
router.get(
    '/',
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }).withMessage('limit 1..100'),
    async (req, res, next) => {
        try {
            const limit = req.query.limit || 20;
            const cursor = req.query.cursor; // ISO строки даты
            const where = { status: 'published' };
            if (cursor) where.createdAt = { $lt: new Date(cursor) };

            const items = await Review.find(where)
                .sort({ createdAt: -1 })
                .limit(limit + 1);

            let nextCursor = null;
            if (items.length > limit) {
                nextCursor = items[limit - 1].createdAt.toISOString();
                items.splice(limit);
            }
            res.json({ items, nextCursor });
        } catch (e) { next(e); }
    }
);

/** POST /api/reviews
 * body: { name, text, rating?=1..5 }
 */
router.post(
    '/',
    body('name').trim().notEmpty().isLength({ max: 80 }).withMessage('Введите имя'),
    body('text').trim().notEmpty().isLength({ max: 2000 }).withMessage('Введите отзыв'),
    body('rating').optional().toInt().isInt({ min: 1, max: 5 }).withMessage('Рейтинг 1..5'),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const { name, text, rating = 5 } = req.body;
            const doc = await Review.create({ name, text, rating, status: 'published' });

            res.status(201).json({ ok: true, item: doc });
        } catch (e) { next(e); }
    }
);

export default router;
