import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino';
import registrationsRouter from './routes/registrations.js';

const {
    PORT = 4000,
    MONGODB_URI = 'mongodb://localhost:27017/coffee_books',
    CLIENT_ORIGIN = 'http://localhost:5173',
} = process.env;

const log = pino({ transport: { target: 'pino-pretty' } });

async function start() {
    // DB
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI);
    log.info('MongoDB connected');

    // App
    const app = express();
    app.use(cors({ origin: CLIENT_ORIGIN }));
    app.use(express.json());

    app.get('/api/health', (_req, res) => res.json({ ok: true }));

    app.use('/api/registrations', registrationsRouter);

    app.use((err, _req, res, _next) => {
        log.error(err);
        res.status(err.status || 500).json({ error: err.message || 'Server error' });
    });

    app.listen(PORT, () => log.info(`API listening on http://localhost:${PORT}`));
}

start().catch((e) => {
    console.error('Fatal:', e);
    process.exit(1);
});
