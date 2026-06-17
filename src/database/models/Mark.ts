import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/database.js';
import type { Student } from './Student.js';
import type { Subject } from './Subject.js';

export class Mark extends Model<InferAttributes<Mark>, InferCreationAttributes<Mark>> {
  declare id: CreationOptional<number>;
  declare studentId: number;
  declare subjectId: number;
  declare marks: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare student?: Student;
  declare subject?: Subject;
}

Mark.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'student_id',
    },
    subjectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'subject_id',
    },
    marks: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('marks');
        return value !== null && value !== undefined ? Number(value) : value;
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'marks',
    modelName: 'Mark',
  },
);
