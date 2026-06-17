import { Op, type OrderItem } from 'sequelize';
import { Student } from '../../../database/index.js';
import type {
  IStudentRepository,
  StudentFindAllOptions,
} from '../interfaces/student.repository.interface.js';
import type { CreateStudentDto, UpdateStudentDto } from '../dto/student.dto.js';

const ALLOWED_SORT_FIELDS = ['firstName', 'lastName', 'email', 'createdAt'] as const;

export class StudentRepository implements IStudentRepository {
  async findAll(options: StudentFindAllOptions) {
    const { offset, limit, search, sortBy, sortOrder = 'ASC' } = options;

    const where = search
      ? {
          [Op.or]: [
            { firstName: { [Op.like]: `%${search}%` } },
            { lastName: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const sortField = ALLOWED_SORT_FIELDS.includes(
      sortBy as (typeof ALLOWED_SORT_FIELDS)[number],
    )
      ? sortBy!
      : 'createdAt';

    const order: OrderItem[] = [[sortField, sortOrder]];

    return Student.findAndCountAll({
      where,
      offset,
      limit,
      order,
    });
  }

  async findById(id: number) {
    return Student.findByPk(id);
  }

  async findByEmail(email: string) {
    return Student.findOne({ where: { email } });
  }

  async create(data: CreateStudentDto) {
    return Student.create(data);
  }

  async update(id: number, data: UpdateStudentDto) {
    const student = await Student.findByPk(id);
    if (!student) return null;
    await student.update(data);
    return student;
  }

  async delete(id: number) {
    const deleted = await Student.destroy({ where: { id } });
    return deleted > 0;
  }
}

export const studentRepository = new StudentRepository();
