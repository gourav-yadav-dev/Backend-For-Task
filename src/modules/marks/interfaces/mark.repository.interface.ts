import type { CreateMarkDto, UpdateMarkDto } from '../dto/mark.dto.js';

export interface MarkFindAllOptions {
  offset: number;
  limit: number;
  studentId?: number;
  subjectId?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IMarkRepository {
  findAll(options: MarkFindAllOptions): Promise<{ rows: import('../../../database/models/Mark.js').Mark[]; count: number }>;
  findById(id: number): Promise<import('../../../database/models/Mark.js').Mark | null>;
  findByStudentAndSubject(studentId: number, subjectId: number): Promise<import('../../../database/models/Mark.js').Mark | null>;
  create(data: CreateMarkDto): Promise<import('../../../database/models/Mark.js').Mark>;
  update(id: number, data: UpdateMarkDto): Promise<import('../../../database/models/Mark.js').Mark | null>;
  delete(id: number): Promise<boolean>;
}
