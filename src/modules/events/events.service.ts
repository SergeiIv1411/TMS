import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from 'src/core/constants';
import { Car } from '../cars/car.model';
import {CreateEventDto} from "./dto/create-event.dto";

import {Event} from "./events.model";

@Injectable()
export class EventsService {
    
    constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof Event) {}

    async create(dto: CreateEventDto) {
        const event = await this.eventRepository.create({...dto})
        return event;
    }

    async getEventById(id: string) {
        const event = await this.eventRepository.findByPk(id);
        return event;
    }

    async getAll() {
        // ,  attributes: ['field1']
        const events = await this.eventRepository.findAll({where: {active: true}, include: {model: Car, as: 'carsInEvent'}, order: [
            ['priority', 'ASC']]});
        return events;
    }

    async getEventsByType(typeEvent: string) {
        const events = await this.eventRepository.findAll({where: {typeEvent, active: true}});
        return events;
    }

    async update(id: string, eventModel: CreateEventDto) {
        const [updatedEvent] = await this.eventRepository.update({ ...eventModel, id }, { where: { id }, returning: true });

        return updatedEvent;
    }

}
