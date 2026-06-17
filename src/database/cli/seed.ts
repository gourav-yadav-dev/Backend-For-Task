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

const SEEDERS_DIR = path.resolve('src/database/seeders');
const META_TABLE = 'SequelizeData';

async function ensureMetaTable(): Promise<void> {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  if (!tables.includes(META_TABLE)) {
    await queryInterface.createTable(META_TABLE, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    });
  }
}

async function getExecutedSeeders(): Promise<Set<string>> {
  const [rows] = await sequelize.query(`SELECT name FROM ${META_TABLE}`);
  return new Set((rows as Array<{ name: string }>).map((row) => row.name));
}

async function runSeeders(): Promise<void> {
  await sequelize.authenticate();
  await ensureMetaTable();

  const executed = await getExecutedSeeders();
  const files = (await readdir(SEEDERS_DIR))
    .filter((file) => file.endsWith('.js'))
    .sort();

  const queryInterface = sequelize.getQueryInterface();

  for (const file of files) {
    if (executed.has(file)) {
      continue;
    }

    console.log(`== ${file}: seeding =======`);
    const moduleUrl = pathToFileURL(path.join(SEEDERS_DIR, file)).href;
    const seeder = await import(moduleUrl);
    await seeder.default.up(queryInterface, Sequelize);
    await sequelize.query(`INSERT INTO ${META_TABLE} (name) VALUES (?)`, {
      replacements: [file],
    });
    console.log(`== ${file}: seeded =======`);
  }

  console.log('Seeders complete.');
}

runSeeders()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
