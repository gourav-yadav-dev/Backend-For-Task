import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../common/exceptions/app.exception.js';

export function validationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: 'path' in err ? String(err.path) : 'unknown',
      message: err.msg,
    }));
    next(new ValidationError('Validation failed', formattedErrors));
    return;
  }

  next();
}
