import type { Request, Response, NextFunction } from 'express';
import { sendCreated, sendNoContent, sendSuccess } from '../../../common/responses/api.response.js';
import { parsePaginationQuery } from '../../../common/helpers/query.helper.js';
import { studentService } from '../services/student.service.js';

export class StudentController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = parsePaginationQuery(req.query as Record<string, unknown>);
      const result = await studentService.getAll(query);
      sendSuccess(res, result.items, 'Students retrieved successfully', 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const student = await studentService.getById(id);
      sendSuccess(res, student, 'Student retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const student = await studentService.create(req.body);
      sendCreated(res, student, 'Student created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const student = await studentService.update(id, req.body);
      sendSuccess(res, student, 'Student updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await studentService.delete(id);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }
}

export const studentController = new StudentController();
