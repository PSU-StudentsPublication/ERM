// backend/src/app.ts
// PSU CRM & PM System — Express Application Setup
// Author: Roise Uddin <r.uddin@psu.edu>

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { router } from './routes';

export const app: Application = express();

// ─── Security ──────────────────────────────────────
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", 'data:', 'https:'],
      scriptSrc:  ["'self'"],
    },
  },
}));

// ─── CORS ──────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// ─── Body Parsing ──────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Compression ───────────────────────────────────
app.use(compression());

// ─── Request Logging ───────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── Global Rate Limiting ──────────────────────────
app.use('/api', rateLimit({
  windowMs:         15 * 60 * 1000,   // 15 minutes
  max:              200,
  standardHeaders:  true,
  legacyHeaders:    false,
  message:          { success: false, message: 'Too many requests — please try again later.' },
}));

// ─── Trust Proxy (for Railway/Vercel) ──────────────
app.set('trust proxy', 1);

// ─── Health Check ──────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status:      'ok',
    app:         'PSU CRM & PM System',
    university:  'Pacific States University',
    version:     process.env.npm_package_version ?? '1.0.0',
    environment: process.env.NODE_ENV ?? 'development',
    timestamp:   new Date().toISOString(),
    uptime:      Math.floor(process.uptime()),
  });
});

// ─── API Routes ────────────────────────────────────
app.use('/api', router);

// ─── 404 Handler ───────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    code:    'NOT_FOUND',
  });
});

// ─── Global Error Handler ──────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error & { status?: number; code?: string }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status ?? 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR ${status}]`, err.message, err.stack);
  }

  res.status(status).json({
    success: false,
    message: status < 500 ? err.message : 'Internal server error',
    code:    err.code ?? 'SERVER_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
