import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Event} from "./event.model";
import { CreateEventDto } from './dto/create-event.dto';
import {EventsService} from "./events.service";

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

}
