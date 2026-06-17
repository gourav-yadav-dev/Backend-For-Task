import type { Response } from 'express';
import type { PaginationMeta } from '../helpers/pagination.helper.js';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
  errors?: Array<{ field: string; message: string }>;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: PaginationMeta,
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T, message = 'Created successfully'): Response {
  return sendSuccess(res, data, message, 201);
}

export function sendNoContent(res: Response): Response {
  return res.status(204).send();
}
