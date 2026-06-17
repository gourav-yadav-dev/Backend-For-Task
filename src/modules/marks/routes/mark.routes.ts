import { Router } from 'express';
import { markController } from '../controllers/mark.controller.js';
import { createMarkValidator, updateMarkValidator } from '../validators/mark.validator.js';
import { validationMiddleware } from '../../../middlewares/validation.middleware.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/marks:
 *   get:
 *     summary: List all marks
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marks list
 */
router.get('/', authMiddleware, markController.getAll.bind(markController));

/**
 * @swagger
 * /api/v1/marks/{id}:
 *   get:
 *     summary: Get mark by ID
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mark details
 */
router.get('/:id', authMiddleware, markController.getById.bind(markController));

/**
 * @swagger
 * /api/v1/marks:
 *   post:
 *     summary: Create marks for a student
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentId, subjectId, marks]
 *             properties:
 *               studentId:
 *                 type: integer
 *               subjectId:
 *                 type: integer
 *               marks:
 *                 type: number
 *     responses:
 *       201:
 *         description: Mark created
 */
router.post(
  '/',
  authMiddleware,
  createMarkValidator,
  validationMiddleware,
  markController.create.bind(markController),
);

/**
 * @swagger
 * /api/v1/marks/{id}:
 *   put:
 *     summary: Update marks
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mark updated
 */
router.put(
  '/:id',
  authMiddleware,
  updateMarkValidator,
  validationMiddleware,
  markController.update.bind(markController),
);

/**
 * @swagger
 * /api/v1/marks/{id}:
 *   delete:
 *     summary: Delete marks
 *     tags: [Marks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Mark deleted
 */
router.delete('/:id', authMiddleware, markController.delete.bind(markController));

export default router;
