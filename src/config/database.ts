import { Sequelize } from 'sequelize';
import { env } from './env.js';
import { logger } from '../common/logger/logger.js';

export const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.password,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    define: {
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error('Unable to connect to the database', { error });
    throw error;
  }
}
