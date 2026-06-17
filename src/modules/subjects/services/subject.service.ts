import { ConflictError, NotFoundError } from '../../../common/exceptions/app.exception.js';
import { buildPaginationMeta, getOffset } from '../../../common/helpers/query.helper.js';
import type { PaginationQuery, PaginatedResult } from '../../../common/helpers/pagination.helper.js';
import type { CreateSubjectDto, SubjectResponseDto, UpdateSubjectDto } from '../dto/subject.dto.js';
import { toSubjectResponseDto, toSubjectResponseDtoList } from '../dto/subject.mapper.js';
import { subjectRepository } from '../repositories/subject.repository.js';

export class SubjectService {
  async getAll(query: PaginationQuery): Promise<PaginatedResult<SubjectResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { rows, count } = await subjectRepository.findAll({
      offset: getOffset(page, limit),
      limit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return {
      items: toSubjectResponseDtoList(rows),
      meta: buildPaginationMeta(page, limit, count),
    };
  }

  async getById(id: number): Promise<SubjectResponseDto> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return toSubjectResponseDto(subject);
  }

  async create(data: CreateSubjectDto): Promise<SubjectResponseDto> {
    const existing = await subjectRepository.findByName(data.name);
    if (existing) {
      throw new ConflictError('Subject with this name already exists');
    }

    const subject = await subjectRepository.create(data);
    return toSubjectResponseDto(subject);
  }

  async update(id: number, data: UpdateSubjectDto): Promise<SubjectResponseDto> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    if (data.name && data.name !== subject.name) {
      const existing = await subjectRepository.findByName(data.name);
      if (existing) {
        throw new ConflictError('Subject with this name already exists');
      }
    }

    const updated = await subjectRepository.update(id, data);
    return toSubjectResponseDto(updated!);
  }

  async delete(id: number): Promise<void> {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }

    await subjectRepository.delete(id);
  }
}

export const subjectService = new SubjectService();
