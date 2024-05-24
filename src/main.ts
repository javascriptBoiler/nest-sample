import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const config = new DocumentBuilder()
    .setTitle('ProjectName')
    .setDescription('The endpoint for project')
    .setVersion('1.0')
    .addTag('project1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.enableCors();
  app.use(json({ limit: '50mb' }));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
