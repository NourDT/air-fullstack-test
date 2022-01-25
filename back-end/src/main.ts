import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

// create app
export async function createApp(expressApp: Express) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return app;
}