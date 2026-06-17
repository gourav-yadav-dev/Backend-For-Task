import type { Student } from '../../../database/models/Student.js';
import type { StudentResponseDto } from '../dto/student.dto.js';

export function toStudentResponseDto(student: Student): StudentResponseDto {
  return {
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}

export function toStudentResponseDtoList(students: Student[]): StudentResponseDto[] {
  return students.map(toStudentResponseDto);
}
