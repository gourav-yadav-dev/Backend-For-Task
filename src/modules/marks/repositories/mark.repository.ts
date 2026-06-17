import { type OrderItem, type WhereOptions } from 'sequelize';
import { Mark, Student, Subject } from '../../../database/index.js';
import type { MarkFindAllOptions } from '../interfaces/mark.repository.interface.js';
import type { CreateMarkDto, UpdateMarkDto } from '../dto/mark.dto.js';

const ALLOWED_SORT_FIELDS = ['marks', 'createdAt'] as const;

export class MarkRepository {
  async findAll(options: MarkFindAllOptions) {
    const { offset, limit, studentId, subjectId, sortBy, sortOrder = 'DESC' } = options;

    const where: WhereOptions = {};
    if (studentId) where.studentId = studentId;
    if (subjectId) where.subjectId = subjectId;

    const sortField = ALLOWED_SORT_FIELDS.includes(
      sortBy as (typeof ALLOWED_SORT_FIELDS)[number],
    )
      ? sortBy!
      : 'createdAt';

    const order: OrderItem[] = [[sortField, sortOrder]];

    return Mark.findAndCountAll({
      where,
      offset,
      limit,
      order,
      include: [
        { model: Student, as: 'student', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Subject, as: 'subject', attributes: ['id', 'name'] },
      ],
    });
  }

  async findById(id: number) {
    return Mark.findByPk(id, {
      include: [
        { model: Student, as: 'student', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Subject, as: 'subject', attributes: ['id', 'name'] },
      ],
    });
  }

  async findByStudentAndSubject(studentId: number, subjectId: number) {
    return Mark.findOne({ where: { studentId, subjectId } });
  }

  async create(data: CreateMarkDto) {
    const mark = await Mark.create(data);
    const created = await this.findById(mark.id);
    if (!created) {
      throw new Error('Failed to create mark record');
    }
    return created;
  }

  async update(id: number, data: UpdateMarkDto) {
    const mark = await Mark.findByPk(id);
    if (!mark) return null;
    await mark.update(data);
    return this.findById(id);
  }

  async delete(id: number) {
    const deleted = await Mark.destroy({ where: { id } });
    return deleted > 0;
  }
}

export const markRepository = new MarkRepository();
