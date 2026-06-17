import { body } from 'express-validator';

export const createSubjectValidator = [
  body('name').trim().notEmpty().withMessage('Subject name is required'),
];

export const updateSubjectValidator = [
  body('name').optional().trim().notEmpty().withMessage('Subject name cannot be empty'),
];
