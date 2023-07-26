import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = config.get('server')

  await app.listen(server.port);
  Logger.log(`Application running on port ${server.port}`)
}
bootstrap();
