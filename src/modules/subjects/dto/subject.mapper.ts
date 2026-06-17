import type { Subject } from '../../../database/models/Subject.js';
import type { SubjectResponseDto } from '../dto/subject.dto.js';

export function toSubjectResponseDto(subject: Subject): SubjectResponseDto {
  return {
    id: subject.id,
    name: subject.name,
    createdAt: subject.createdAt,
    updatedAt: subject.updatedAt,
  };
}

export function toSubjectResponseDtoList(subjects: Subject[]): SubjectResponseDto[] {
  return subjects.map(toSubjectResponseDto);
}
