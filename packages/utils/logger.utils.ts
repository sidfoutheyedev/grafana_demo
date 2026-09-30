import winston from 'winston';
import LokiTransport from 'winston-loki';
const { combine, timestamp, printf, colorize } = winston.format;

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: "info",
    format: combine(
      timestamp({ format: "HH:mm:ss" }),
      colorize(),
      printf(({ timestamp: ts, level, message }) => `${ts} ${level} : ${message}`)
    ),
  }),
];

if (process.env.NODE_ENV !== 'test') {
  transports.push(
    new LokiTransport({
      host: process.env.LOKI_URL || 'http://loki:3100',
      labels: { app: process.env.APP_NAME || 'grafana-setup' },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err: Error) => console.error('Loki transport error:', err.message),
    })
  );
}

const logger = winston.createLogger({ transports });

export const Log = { logger };
