import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = +process.env.APP_BACKEND_PORT || 5000;
  await app.listen(port, () => console.log(`App listening on ${port}`));
}
bootstrap();
