import { Router } from 'express';
import { studentController } from '../controllers/student.controller.js';
import { createStudentValidator, updateStudentValidator } from '../validators/student.validator.js';
import { validationMiddleware } from '../../../middlewares/validation.middleware.js';
import { authMiddleware } from '../../../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: List all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       200:
 *         description: Students list
 */
router.get('/', authMiddleware, studentController.getAll.bind(studentController));

/**
 * @swagger
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
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
 *         description: Student details
 */
router.get('/:id', authMiddleware, studentController.getById.bind(studentController));

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */
router.post(
  '/',
  authMiddleware,
  createStudentValidator,
  validationMiddleware,
  studentController.create.bind(studentController),
);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
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
 *         description: Student updated
 */
router.put(
  '/:id',
  authMiddleware,
  updateStudentValidator,
  validationMiddleware,
  studentController.update.bind(studentController),
);

/**
 * @swagger
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
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
 *         description: Student deleted
 */
router.delete('/:id', authMiddleware, studentController.delete.bind(studentController));

export default router;
