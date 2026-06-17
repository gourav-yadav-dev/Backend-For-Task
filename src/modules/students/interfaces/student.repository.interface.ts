import type { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto.js';

export interface IStudentRepository {
  findAll(options: StudentFindAllOptions): Promise<{ rows: import('../../../database/models/Student.js').Student[]; count: number }>;
  findById(id: number): Promise<import('../../../database/models/Student.js').Student | null>;
  findByEmail(email: string): Promise<import('../../../database/models/Student.js').Student | null>;
  create(data: CreateStudentDto): Promise<import('../../../database/models/Student.js').Student>;
  update(id: number, data: UpdateStudentDto): Promise<import('../../../database/models/Student.js').Student | null>;
  delete(id: number): Promise<boolean>;
}

export interface StudentFindAllOptions {
  offset: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
