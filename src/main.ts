import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  // global prefix
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
        .setTitle('Api TMS')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Управление транспортом на территории ГК Триол')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
  await app.listen(3000);
}
bootstrap();
