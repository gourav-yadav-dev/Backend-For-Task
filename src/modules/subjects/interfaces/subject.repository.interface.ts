import type { CreateSubjectDto, UpdateSubjectDto } from '../dto/subject.dto.js';

export interface SubjectFindAllOptions {
  offset: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ISubjectRepository {
  findAll(options: SubjectFindAllOptions): Promise<{ rows: import('../../../database/models/Subject.js').Subject[]; count: number }>;
  findById(id: number): Promise<import('../../../database/models/Subject.js').Subject | null>;
  findByName(name: string): Promise<import('../../../database/models/Subject.js').Subject | null>;
  create(data: CreateSubjectDto): Promise<import('../../../database/models/Subject.js').Subject>;
  update(id: number, data: UpdateSubjectDto): Promise<import('../../../database/models/Subject.js').Subject | null>;
  delete(id: number): Promise<boolean>;
}
