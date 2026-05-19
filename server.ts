// backend/src/server.ts
// PSU CRM & PM System — Server Entry Point
// Author: Roise Uddin <r.uddin@psu.edu>

import 'dotenv/config';
import http from 'http';
import { app } from './app';
import { initSocket } from '../config/socket';
import { connectDatabase } from '../config/database';
import { connectRedis } from '../config/redis';

const PORT = parseInt(process.env.PORT ?? '4000', 10);

async function bootstrap() {
  try {
    // ── Connect Database ─────────────────────────
    await connectDatabase();
    console.log('✅ PostgreSQL connected');

    // ── Connect Redis ────────────────────────────
    await connectRedis();
    console.log('✅ Redis connected');

    // ── Create HTTP Server ───────────────────────
    const server = http.createServer(app);

    // ── Init Socket.io ───────────────────────────
    initSocket(server);
    console.log('✅ Socket.io initialized');

    // ── Start Listening ──────────────────────────
    server.listen(PORT, () => {
      console.log('');
      console.log('╔══════════════════════════════════════════════╗');
      console.log('║   PSU CRM & PM System — API Server           ║');
      console.log('║   Pacific States University, Los Angeles     ║');
      console.log('╠══════════════════════════════════════════════╣');
      console.log(`║   🚀 Running on  http://localhost:${PORT}        ║`);
      console.log(`║   📖 Docs at     http://localhost:${PORT}/docs   ║`);
      console.log(`║   🌿 Env:        ${(process.env.NODE_ENV ?? 'development').padEnd(28)}║`);
      console.log('╚══════════════════════════════════════════════╝');
      console.log('');
    });

    // ── Graceful Shutdown ────────────────────────
    const shutdown = (signal: string) => {
      console.log(`\n${signal} received — shutting down gracefully…`);
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10_000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));

    // ── Unhandled Rejections ─────────────────────
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled rejection:', reason);
    });
    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception:', err);
      process.exit(1);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();
