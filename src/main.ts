import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MAX_FILE_BY_REQUEST, MAX_FILE_SIZE } from './core/core.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });
  // = PIPE
  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false },
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(validationErrors);
    },
    transform: true,
  }));

  // = REGISTER
  app.register(require('fastify-helmet'));
  app.register(require('fastify-multipart'), {
    limits: {
      fileSize: MAX_FILE_SIZE,
      files: MAX_FILE_BY_REQUEST,
    },
  });

  // = SWAGGER
  const appOptions = new DocumentBuilder()
    .setTitle('App API')
    .setDescription('The API for angular')
    .setVersion('3.0')
    .addBearerAuth()
    .build();

  const appDocument = SwaggerModule.createDocument(app, appOptions, {
    include: [
      AuthModule,
    ],
  });
  SwaggerModule.setup('api/app', app, appDocument);

  await app.listen(parseInt(process.env.PORT, 10) | 3001, '0.0.0.0');
}

bootstrap();
