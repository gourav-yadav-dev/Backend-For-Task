import type { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../common/exceptions/app.exception.js';
import { logger } from '../common/logger/logger.js';
import { HTTP_STATUS } from '../common/constants/index.js';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack });

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal server error',
  });
}
