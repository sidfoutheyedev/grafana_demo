import * as metricsModule from '../metrics/index';
import type { Request, Response } from 'express';

const { register } = metricsModule;

export const getMetrics = async (_req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
};
