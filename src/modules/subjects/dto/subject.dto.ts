export interface CreateSubjectDto {
  name: string;
}

export interface UpdateSubjectDto {
  name?: string;
}

export interface SubjectResponseDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
