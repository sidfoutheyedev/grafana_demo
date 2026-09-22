import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import configModule from '../packages/config/index';
import * as managerModule from '../packages/manager/index';
import * as handlersModule from '../packages/handlers/index';
import * as constantsModule from '../packages/constants/index';
import routesModule from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import type { Request, Response, NextFunction } from 'express';
import * as errorMiddlewareModule from './middlewares/error.middleware';
import * as notFoundMiddlewareModule from './middlewares/not-found.middleware';
import * as metricsMiddlewareModule from './middlewares/metrics.middleware';

const config = configModule;
const { logger } = managerModule;
const { CONSTANT } = constantsModule;
const routes = routesModule;
const errorMiddleware = errorMiddlewareModule.errorMiddleware;
const notFoundMiddleware = notFoundMiddlewareModule.notFoundMiddleware;
const trackMetrics = metricsMiddlewareModule.trackMetrics;

const app = express();

app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(rateLimit({
  windowMs: CONSTANT.RATE_LIMIT.WINDOW_MS,
  max: CONSTANT.RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trackMetrics);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "grafana-setup", version: "1.0.0" },
  },
  apis: ["./src/docs/*.js","./dist/src/docs/*.js"],
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
