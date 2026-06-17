import type { Mark } from '../../../database/models/Mark.js';
import type { MarkResponseDto } from '../dto/mark.dto.js';

export function toMarkResponseDto(mark: Mark): MarkResponseDto {
  const dto: MarkResponseDto = {
    id: mark.id,
    studentId: mark.studentId,
    subjectId: mark.subjectId,
    marks: mark.marks,
    createdAt: mark.createdAt,
    updatedAt: mark.updatedAt,
  };

  if (mark.student) {
    dto.student = {
      id: mark.student.id,
      firstName: mark.student.firstName,
      lastName: mark.student.lastName,
      email: mark.student.email,
    };
  }

  if (mark.subject) {
    dto.subject = {
      id: mark.subject.id,
      name: mark.subject.name,
    };
  }

  return dto;
}

export function toMarkResponseDtoList(marks: Mark[]): MarkResponseDto[] {
  return marks.map(toMarkResponseDto);
}
