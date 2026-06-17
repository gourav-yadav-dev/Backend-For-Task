export interface DashboardSubjectDto {
  subject: string;
  marks: number;
}

export interface DashboardStudentDto {
  studentId: number;
  studentName: string;
  email: string;
  subjects: DashboardSubjectDto[];
  averageMarks: number;
}
