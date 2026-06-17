import { Router } from 'express';
import studentRoutes from '../modules/students/routes/student.routes.js';
import subjectRoutes from '../modules/subjects/routes/subject.routes.js';
import markRoutes from '../modules/marks/routes/mark.routes.js';
import dashboardRoutes from '../modules/dashboard/routes/dashboard.routes.js';
import authRoutes from '../modules/auth/routes/auth.routes.js';
import { sendSuccess } from '../common/responses/api.response.js';
import { sequelize } from '../database/index.js';

const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     security: []
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', async (_req, res) => {
  let dbStatus = 'connected';

  try {
    await sequelize.authenticate();
  } catch {
    dbStatus = 'disconnected';
  }

  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
  }, 'Service is healthy');
});

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/subjects', subjectRoutes);
router.use('/marks', markRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
