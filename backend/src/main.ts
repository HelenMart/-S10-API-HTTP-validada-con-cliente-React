
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permitir solamente el origen del frontend
  
  app.enableCors({
  origin: 'http://localhost:5173',
  });

  // Activar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar documentación OpenAPI
  const config = new DocumentBuilder()
    .setTitle('API de Inventario')
    .setDescription(
      'API REST para administrar productos con NestJS',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
