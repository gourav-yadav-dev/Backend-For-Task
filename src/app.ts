import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import './database/index.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(loggerMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', routes);

app.use(errorMiddleware);

export default app;
