import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError } from '../common/exceptions/app.exception.js';

export interface AuthPayload {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    next(new UnauthorizedError('Access token is required'));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
