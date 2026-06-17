import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/dashboard/students:
 *   get:
 *     summary: Get dashboard with students, subjects and average marks
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get(
  '/students',
  authMiddleware,
  dashboardController.getStudents.bind(dashboardController),
);

export default router;
