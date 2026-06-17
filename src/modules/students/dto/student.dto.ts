export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface StudentResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
