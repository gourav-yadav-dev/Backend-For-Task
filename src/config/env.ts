import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
  nodeEnv: string;
  port: number;
  db: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  corsOrigin: string;
  logLevel: string;
}

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'student_marks_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  jwt: {
    secret: requireEnv('JWT_SECRET', 'dev_jwt_secret_change_me'),
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL || 'info',
};
