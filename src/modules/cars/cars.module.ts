import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { carsProviders } from './cars.providers';

@Module({
  providers: [CarsService, ...carsProviders],
  controllers: [CarsController]
})
export class CarsModule {}
