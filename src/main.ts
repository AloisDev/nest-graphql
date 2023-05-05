import { ValidationPipe, Logger as AppLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

const appLogger = new AppLogger('Application Bootstrap');
process.on('warning', (warning: Error) => {
  appLogger.error({ type: 'warning' });
  appLogger.error(warning);
});

process.on('unhandledRejection', (reason, promise) => {
  appLogger.error({ type: 'unhandledRejection', promise: promise });
  appLogger.error(reason);
});

process.on('uncaughtException', (error: Error) => {
  appLogger.error({ type: 'uncaughtException' });
  appLogger.error(error);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
