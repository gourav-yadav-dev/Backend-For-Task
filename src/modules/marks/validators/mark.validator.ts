import { body } from 'express-validator';

export const createMarkValidator = [
  body('studentId').isInt({ min: 1 }).withMessage('Valid student ID is required'),
  body('subjectId').isInt({ min: 1 }).withMessage('Valid subject ID is required'),
  body('marks')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Marks must be between 0 and 100'),
];

export const updateMarkValidator = [
  body('studentId').optional().isInt({ min: 1 }).withMessage('Valid student ID is required'),
  body('subjectId').optional().isInt({ min: 1 }).withMessage('Valid subject ID is required'),
  body('marks')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Marks must be between 0 and 100'),
];
