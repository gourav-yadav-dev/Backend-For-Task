import { Op, type OrderItem } from 'sequelize';
import { Subject } from '../../../database/index.js';
import type { SubjectFindAllOptions } from '../interfaces/subject.repository.interface.js';
import type { CreateSubjectDto, UpdateSubjectDto } from '../dto/subject.dto.js';

const ALLOWED_SORT_FIELDS = ['name', 'createdAt'] as const;

export class SubjectRepository {
  async findAll(options: SubjectFindAllOptions) {
    const { offset, limit, search, sortBy, sortOrder = 'ASC' } = options;

    const where = search ? { name: { [Op.like]: `%${search}%` } } : {};

    const sortField = ALLOWED_SORT_FIELDS.includes(
      sortBy as (typeof ALLOWED_SORT_FIELDS)[number],
    )
      ? sortBy!
      : 'createdAt';

    const order: OrderItem[] = [[sortField, sortOrder]];

    return Subject.findAndCountAll({ where, offset, limit, order });
  }

  async findById(id: number) {
    return Subject.findByPk(id);
  }

  async findByName(name: string) {
    return Subject.findOne({ where: { name } });
  }

  async create(data: CreateSubjectDto) {
    return Subject.create(data);
  }

  async update(id: number, data: UpdateSubjectDto) {
    const subject = await Subject.findByPk(id);
    if (!subject) return null;
    await subject.update(data);
    return subject;
  }

  async delete(id: number) {
    const deleted = await Subject.destroy({ where: { id } });
    return deleted > 0;
  }
}

export const subjectRepository = new SubjectRepository();
