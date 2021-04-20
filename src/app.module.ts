import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EventsModule,
    CarsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
