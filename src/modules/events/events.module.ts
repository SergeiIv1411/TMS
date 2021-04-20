import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';

@Module({
  providers: [EventsService, ...eventsProviders],
  controllers: [EventsController]
})
export class EventsModule {}
