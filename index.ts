// backend/src/routes/index.ts
// PSU CRM & PM System — Main API Router
// Author: Roise Uddin <r.uddin@psu.edu>

import { Router } from 'express';
import authRoutes      from './auth.routes';
import projectRoutes   from './projects.routes';
import taskRoutes      from './tasks.routes';
import crmRoutes       from './crm.routes';
import teamRoutes      from './team.routes';
import documentRoutes  from './documents.routes';
import reportRoutes    from './reports.routes';
import aiRoutes        from './ai.routes';

export const router = Router();

// ─── API v1 Routes ────────────────────────────────
router.use('/auth',      authRoutes);
router.use('/projects',  projectRoutes);
router.use('/tasks',     taskRoutes);
router.use('/crm',       crmRoutes);
router.use('/team',      teamRoutes);
router.use('/documents', documentRoutes);
router.use('/reports',   reportRoutes);
router.use('/ai',        aiRoutes);

// ─── API Info ─────────────────────────────────────
router.get('/', (_req, res) => {
  res.json({
    name:       'PSU CRM & PM API',
    university: 'Pacific States University',
    version:    'v1',
    author:     'Roise Uddin',
    endpoints: {
      auth:      '/api/auth',
      projects:  '/api/projects',
      tasks:     '/api/tasks',
      crm:       '/api/crm',
      team:      '/api/team',
      documents: '/api/documents',
      reports:   '/api/reports',
      ai:        '/api/ai',
    },
  });
});
