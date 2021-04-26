import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from 'src/core/constants';
import {CreateEventDto} from "./dto/create-event.dto";

import {Event} from "./events.model";

@Injectable()
export class EventsService {
    
    constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof Event) {}

    async create(dto: CreateEventDto) {
        const event = await this.eventRepository.create({...dto})
        return event;
    }

    async getAll() {
        const events = await this.eventRepository.findAll({where: {active: true}});
        return events;
    }

    async getEventsByType(typeEvent: string) {
        const events = await this.eventRepository.findAll({where: {typeEvent, active: true}});
        return events;
    }

    async getEventByGuid(guid: string) {
        const event = await this.eventRepository.findOne({where: {guid}});
        return event;
    }

    async update(id: number, eventModel: CreateEventDto) {
        const [updatedEvent] = await this.eventRepository.update({ ...eventModel, id }, { where: { id }, returning: true });

        return updatedEvent;
    }

}
