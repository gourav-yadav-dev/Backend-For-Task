import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { DataTypes, Sequelize } from 'sequelize';
import sequelizeCliConfig from '../../config/sequelize-cli.js';

const env = process.env.NODE_ENV || 'development';
const config = sequelizeCliConfig[env as keyof typeof sequelizeCliConfig];

const sequelize = new Sequelize(config.database!, config.username!, config.password!, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging,
});

const MIGRATIONS_DIR = path.resolve('src/database/migrations');
const META_TABLE = 'SequelizeMeta';

async function getExecutedMigrations(): Promise<string[]> {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  if (!tables.includes(META_TABLE)) {
    return [];
  }

  const [rows] = await sequelize.query(`SELECT name FROM ${META_TABLE} ORDER BY name DESC`);
  return (rows as Array<{ name: string }>).map((row) => row.name);
}

async function undoLastMigration(): Promise<void> {
  await sequelize.authenticate();

  const executed = await getExecutedMigrations();
  if (executed.length === 0) {
    console.log('No migrations to undo.');
    return;
  }

  const file = executed[0];
  console.log(`== ${file}: reverting =======`);

  const moduleUrl = pathToFileURL(path.join(MIGRATIONS_DIR, file)).href;
  const migration = await import(moduleUrl);
  await migration.default.down(sequelize.getQueryInterface(), Sequelize);
  await sequelize.query(`DELETE FROM ${META_TABLE} WHERE name = ?`, { replacements: [file] });

  console.log(`== ${file}: reverted =======`);
}

undoLastMigration()
  .catch((error) => {
    console.error('Migration undo failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
