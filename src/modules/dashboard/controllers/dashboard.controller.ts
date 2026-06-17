import type { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../../common/responses/api.response.js';
import { dashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  async getStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await dashboardService.getStudentsDashboard();
      sendSuccess(res, data, 'Dashboard data retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
