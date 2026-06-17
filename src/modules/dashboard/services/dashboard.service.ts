import type { DashboardStudentDto } from '../dto/dashboard.dto.js';
import { dashboardRepository } from '../repositories/dashboard.repository.js';

export class DashboardService {
  async getStudentsDashboard(): Promise<DashboardStudentDto[]> {
    const students = await dashboardRepository.getStudentsWithMarks();

    return students.map((student) => {
      const subjects = (student.marks ?? []).map((mark) => ({
        subject: mark.subject?.name ?? 'Unknown',
        marks: Number(mark.marks),
      }));

      const totalMarks = subjects.reduce((sum, item) => sum + item.marks, 0);
      const subjectCount = subjects.length;
      const averageMarks =
        subjectCount > 0 ? Math.round((totalMarks / subjectCount) * 100) / 100 : 0;

      return {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        email: student.email,
        subjects,
        averageMarks,
      };
    });
  }
}

export const dashboardService = new DashboardService();
