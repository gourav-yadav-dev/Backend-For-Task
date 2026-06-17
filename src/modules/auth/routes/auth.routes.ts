import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validationMiddleware } from '../../../middlewares/validation.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login and receive JWT token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', loginValidator, validationMiddleware, authController.login.bind(authController));

export default router;
