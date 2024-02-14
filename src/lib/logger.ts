import pino from 'pino';

export const logger = pino({
  transport: process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
});

export const namedLogger = (name: string) => {
  const childLogger = logger.child({ name });
  return childLogger;
};
