import { NestFactory } from '@nestjs/core';
import config from 'config';

import { AppModule } from './app.module';
import { LoggerService } from './modules/logger';

async function bootstrap(): Promise<void> {
  const applicationPort = config.get<number>('application.port');
  const cors = config.get<boolean>('application.cors');

  const app = await NestFactory.create(AppModule, { cors, logger: false });

  app.useLogger(app.get(LoggerService));

  await app.listen(applicationPort);
}

bootstrap();
