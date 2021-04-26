import { ParseArrayPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

//'amqp://dev:dev123@10.12.16.98:5672/DEV'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://dev:dev123@rmq.amma.local:5672/DEV'],
      queue: 'ERPToTMStest',
      //queue: 'ERPToTMS',
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
