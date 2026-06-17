import { Student, Mark, Subject } from '../../../database/index.js';
import type { DashboardStudentDto } from '../dto/dashboard.dto.js';

export class DashboardRepository {
  async getStudentsWithMarks(): Promise<Student[]> {
    return Student.findAll({
      include: [
        {
          model: Mark,
          as: 'marks',
          include: [{ model: Subject, as: 'subject', attributes: ['name'] }],
        },
      ],
      order: [['firstName', 'ASC']],
    });
  }
}

export const dashboardRepository = new DashboardRepository();
