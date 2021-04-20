import { ParseArrayPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['http://rmq.amma.local:15672'],
      queue: 'ERPToTMS',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen(() => {
    console.log('Microservice is listening')
  });
}

bootstrap();
