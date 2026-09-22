import * as metricsModule from '../metrics/index';
import type { Request, Response, NextFunction } from 'express';

const { httpRequestDuration, httpRequestsTotal } = metricsModule;

export const trackMetrics = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const route = req.route?.path ? `${req.baseUrl}${req.route.path}` : req.path;
    const labels = { method: req.method, route, status_code: String(res.statusCode) };
    const durationSeconds = Number(process.hrtime.bigint() - start) / 1e9;
    httpRequestDuration.observe(labels, durationSeconds);
    httpRequestsTotal.inc(labels);
  });
  next();
};
