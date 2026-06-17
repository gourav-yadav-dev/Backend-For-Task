import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './common/logger/logger.js';

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
      logger.info(`Swagger docs available at http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

startServer();
