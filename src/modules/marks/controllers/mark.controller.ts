import type { Request, Response, NextFunction } from 'express';
import { sendCreated, sendNoContent, sendSuccess } from '../../../common/responses/api.response.js';
import { parsePaginationQuery } from '../../../common/helpers/query.helper.js';
import { markService } from '../services/mark.service.js';

export class MarkController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const baseQuery = parsePaginationQuery(req.query as Record<string, unknown>);
      const studentId = req.query.studentId ? Number(req.query.studentId) : undefined;
      const subjectId = req.query.subjectId ? Number(req.query.subjectId) : undefined;

      const result = await markService.getAll({ ...baseQuery, studentId, subjectId });
      sendSuccess(res, result.items, 'Marks retrieved successfully', 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const mark = await markService.getById(id);
      sendSuccess(res, mark, 'Mark retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mark = await markService.create(req.body);
      sendCreated(res, mark, 'Mark created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const mark = await markService.update(id, req.body);
      sendSuccess(res, mark, 'Mark updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await markService.delete(id);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }
}

export const markController = new MarkController();
