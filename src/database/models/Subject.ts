import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../../config/database.js';
import type { Mark } from './Mark.js';

export class Subject extends Model<
  InferAttributes<Subject>,
  InferCreationAttributes<Subject>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare marks?: Mark[];
}

Subject.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'subjects',
    modelName: 'Subject',
  },
);
