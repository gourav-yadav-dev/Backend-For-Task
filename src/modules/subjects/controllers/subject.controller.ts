import type { Request, Response, NextFunction } from 'express';
import { sendCreated, sendNoContent, sendSuccess } from '../../../common/responses/api.response.js';
import { parsePaginationQuery } from '../../../common/helpers/query.helper.js';
import { subjectService } from '../services/subject.service.js';

export class SubjectController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = parsePaginationQuery(req.query as Record<string, unknown>);
      const result = await subjectService.getAll(query);
      sendSuccess(res, result.items, 'Subjects retrieved successfully', 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const subject = await subjectService.getById(id);
      sendSuccess(res, subject, 'Subject retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subject = await subjectService.create(req.body);
      sendCreated(res, subject, 'Subject created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const subject = await subjectService.update(id, req.body);
      sendSuccess(res, subject, 'Subject updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await subjectService.delete(id);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }
}

export const subjectController = new SubjectController();
