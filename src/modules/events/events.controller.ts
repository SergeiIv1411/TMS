import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Event} from "./events.model";
import { CreateEventDto } from './dto/create-event.dto';
import {EventsService} from "./events.service";
import { EventPattern } from '@nestjs/microservices';

@ApiTags('События')
@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @ApiOperation({summary: 'Создание события'})
    @ApiResponse({status: 200, type: Event})
    @Post()
    create(@Body() eventDto: CreateEventDto) {
        return this.eventsService.create(eventDto);
    }

    @ApiOperation({summary: 'Получить все активные события'})
    @ApiResponse({status: 200, type: [Event]})
    @Get()
    getAll() {
        return this.eventsService.getAll();
    }

    @ApiOperation({summary: 'Получить события по типу'})
    @ApiResponse({status: 200, type: [Event]})
    @Get('/:eventType')
    getEventsByType(@Param('eventType') eventType: string) {
        return this.eventsService.getEventsByType(eventType);
    }

    @EventPattern('change_Event')
    async uploadEventFromERP(data: string) {
        let eventModel = new CreateEventDto();
        
        eventModel = JSON.parse(data);
        const guid = eventModel.guid;
        const eventFromDB = await this.eventsService.getEventByGuid(guid);
        if (eventFromDB) {
            await this.eventsService.update(eventFromDB.id, eventModel)
        } else {
            await this.eventsService.create(eventModel);
        }
        
    }

}
