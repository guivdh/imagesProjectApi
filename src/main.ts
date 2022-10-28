import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MAX_FILE_BY_REQUEST, MAX_FILE_SIZE } from './core/core.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });
  app.useGlobalPipes(new ValidationPipe());
  // To gracefully shutdown
  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
