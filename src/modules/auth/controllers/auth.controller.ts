import type { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../../common/responses/api.response.js';
import { authService } from '../services/auth.service.js';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
