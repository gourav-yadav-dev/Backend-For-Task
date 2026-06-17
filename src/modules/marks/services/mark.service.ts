import { BadRequestError, ConflictError, NotFoundError } from '../../../common/exceptions/app.exception.js';
import { buildPaginationMeta, getOffset } from '../../../common/helpers/query.helper.js';
import type { PaginationQuery, PaginatedResult } from '../../../common/helpers/pagination.helper.js';
import { studentRepository } from '../../students/repositories/student.repository.js';
import { subjectRepository } from '../../subjects/repositories/subject.repository.js';
import type { CreateMarkDto, MarkResponseDto, UpdateMarkDto } from '../dto/mark.dto.js';
import { toMarkResponseDto, toMarkResponseDtoList } from '../dto/mark.mapper.js';
import { markRepository } from '../repositories/mark.repository.js';

export interface MarkListQuery extends PaginationQuery {
  studentId?: number;
  subjectId?: number;
}

export class MarkService {
  async getAll(query: MarkListQuery): Promise<PaginatedResult<MarkResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { rows, count } = await markRepository.findAll({
      offset: getOffset(page, limit),
      limit,
      studentId: query.studentId,
      subjectId: query.subjectId,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return {
      items: toMarkResponseDtoList(rows),
      meta: buildPaginationMeta(page, limit, count),
    };
  }

  async getById(id: number): Promise<MarkResponseDto> {
    const mark = await markRepository.findById(id);
    if (!mark) {
      throw new NotFoundError('Mark record not found');
    }
    return toMarkResponseDto(mark);
  }

  async create(data: CreateMarkDto): Promise<MarkResponseDto> {
    await this.validateStudentAndSubject(data.studentId, data.subjectId);

    const existing = await markRepository.findByStudentAndSubject(
      data.studentId,
      data.subjectId,
    );
    if (existing) {
      throw new ConflictError('Marks already exist for this student and subject');
    }

    const mark = await markRepository.create(data);
    return toMarkResponseDto(mark);
  }

  async update(id: number, data: UpdateMarkDto): Promise<MarkResponseDto> {
    const mark = await markRepository.findById(id);
    if (!mark) {
      throw new NotFoundError('Mark record not found');
    }

    const studentId = data.studentId ?? mark.studentId;
    const subjectId = data.subjectId ?? mark.subjectId;

    if (data.studentId || data.subjectId) {
      await this.validateStudentAndSubject(studentId, subjectId);

      const existing = await markRepository.findByStudentAndSubject(studentId, subjectId);
      if (existing && existing.id !== id) {
        throw new ConflictError('Marks already exist for this student and subject');
      }
    }

    const updated = await markRepository.update(id, data);
    return toMarkResponseDto(updated!);
  }

  async delete(id: number): Promise<void> {
    const mark = await markRepository.findById(id);
    if (!mark) {
      throw new NotFoundError('Mark record not found');
    }

    await markRepository.delete(id);
  }

  private async validateStudentAndSubject(studentId: number, subjectId: number): Promise<void> {
    const student = await studentRepository.findById(studentId);
    if (!student) {
      throw new BadRequestError('Student not found');
    }

    const subject = await subjectRepository.findById(subjectId);
    if (!subject) {
      throw new BadRequestError('Subject not found');
    }
  }
}

export const markService = new MarkService();
