export interface CreateMarkDto {
  studentId: number;
  subjectId: number;
  marks: number;
}

export interface UpdateMarkDto {
  studentId?: number;
  subjectId?: number;
  marks?: number;
}

export interface MarkResponseDto {
  id: number;
  studentId: number;
  subjectId: number;
  marks: number;
  student?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  subject?: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
