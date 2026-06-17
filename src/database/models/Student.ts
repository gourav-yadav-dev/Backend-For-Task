import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/database.js';
import type { Mark } from './Mark.js';

export class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare marks?: Mark[];
}

Student.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'students',
    modelName: 'Student',
  },
);
