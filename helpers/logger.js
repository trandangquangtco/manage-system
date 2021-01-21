/* eslint-disable import/prefer-default-export */
import winston from 'winston';

const {
  combine, timestamp, errors, json, splat, prettyPrint,
} = winston.format;

const logger = winston.createLogger({
  format: combine(
    json(),
    errors({ stack: true }),
    splat(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console(),
  ],
});

export { logger };
