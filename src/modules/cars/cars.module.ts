import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { carsProviders } from './cars.providers';
import { EventsModule } from '../events/events.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [CarsService, ...carsProviders],
  controllers: [CarsController],
  imports: [
    EventsModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://dev:dev123@rmq.amma.local:5672/DEV'],
          queue: 'TMSToERPtest',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
})
export class CarsModule {}
