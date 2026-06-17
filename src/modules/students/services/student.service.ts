import { ConflictError, NotFoundError } from '../../../common/exceptions/app.exception.js';
import { buildPaginationMeta, getOffset } from '../../../common/helpers/query.helper.js';
import type { PaginationQuery } from '../../../common/helpers/pagination.helper.js';
import type { PaginatedResult } from '../../../common/helpers/pagination.helper.js';
import type { CreateStudentDto, StudentResponseDto, UpdateStudentDto } from '../dto/student.dto.js';
import { toStudentResponseDto, toStudentResponseDtoList } from '../dto/student.mapper.js';
import { studentRepository } from '../repositories/student.repository.js';

export class StudentService {
  async getAll(query: PaginationQuery): Promise<PaginatedResult<StudentResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { rows, count } = await studentRepository.findAll({
      offset: getOffset(page, limit),
      limit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return {
      items: toStudentResponseDtoList(rows),
      meta: buildPaginationMeta(page, limit, count),
    };
  }

  async getById(id: number): Promise<StudentResponseDto> {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    return toStudentResponseDto(student);
  }

  async create(data: CreateStudentDto): Promise<StudentResponseDto> {
    const existing = await studentRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('Student with this email already exists');
    }

    const student = await studentRepository.create(data);
    return toStudentResponseDto(student);
  }

  async update(id: number, data: UpdateStudentDto): Promise<StudentResponseDto> {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    if (data.email && data.email !== student.email) {
      const existing = await studentRepository.findByEmail(data.email);
      if (existing) {
        throw new ConflictError('Student with this email already exists');
      }
    }

    const updated = await studentRepository.update(id, data);
    return toStudentResponseDto(updated!);
  }

  async delete(id: number): Promise<void> {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    await studentRepository.delete(id);
  }
}

export const studentService = new StudentService();
