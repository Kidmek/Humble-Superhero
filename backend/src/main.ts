import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Superheroes API') // Title of your API
    .setDescription('API for managing superheroes') // Description
    .setVersion('1.0') // API Version
    .addTag('superheroes') // Add a tag for grouping endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
