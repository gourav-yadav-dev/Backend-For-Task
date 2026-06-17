import { Router } from 'express';
import { subjectController } from '../controllers/subject.controller.js';
import { createSubjectValidator, updateSubjectValidator } from '../validators/subject.validator.js';
import { validationMiddleware } from '../../../middlewares/validation.middleware.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/subjects:
 *   get:
 *     summary: List all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subjects list
 */
router.get('/', authMiddleware, subjectController.getAll.bind(subjectController));

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
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
 *         description: Subject details
 */
router.get('/:id', authMiddleware, subjectController.getById.bind(subjectController));

/**
 * @swagger
 * /api/v1/subjects:
 *   post:
 *     summary: Create a subject
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subject created
 */
router.post(
  '/',
  authMiddleware,
  createSubjectValidator,
  validationMiddleware,
  subjectController.create.bind(subjectController),
);

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   put:
 *     summary: Update a subject
 *     tags: [Subjects]
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
 *         description: Subject updated
 */
router.put(
  '/:id',
  authMiddleware,
  updateSubjectValidator,
  validationMiddleware,
  subjectController.update.bind(subjectController),
);

/**
 * @swagger
 * /api/v1/subjects/{id}:
 *   delete:
 *     summary: Delete a subject
 *     tags: [Subjects]
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
 *         description: Subject deleted
 */
router.delete('/:id', authMiddleware, subjectController.delete.bind(subjectController));

export default router;
