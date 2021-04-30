import { Inject, Injectable } from '@nestjs/common';
import { CAR_REPOSITORY } from 'src/core/constants';
import { EventsService } from '../events/events.service';
import { Car } from './car.model';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    
    constructor(@Inject(CAR_REPOSITORY) private readonly carRepository: typeof Car,
    private eventService: EventsService) {}        

    async getAll(limitOf: number, offsetOf: number, sortBy: string, sortDesc: boolean) {
       
        const cars = await this.carRepository.findAndCountAll({limit : limitOf, offset: offsetOf, order: [
            [sortBy, sortDesc ? 'DESC': 'ASC']
        ],});
        return cars;    
    }

    async create(dto: CreateCarDto) {
        const car = await this.carRepository.create({...dto})
        const event = await this.eventService.getEventById(dto.eventId)
        await car.$add('events', [event.id], { through: {factDate: dto.factDate}})
        //await car.$set('events', [event.id])
        car.events = [event]
        return car;
    }

    async getById(id: string) {
        const car = await this.carRepository.findByPk(id);
        return car;
    }

    async update(id: string, carModel: CreateCarDto) {
        const [numberUpdatedCar, updatedCar] = await this.carRepository.update({ ...carModel, id }, { where: { id }, returning: true });
        const event = await this.eventService.getEventById(carModel.eventId)
        // await car.$set('events', [event.id], { through: {factDate: dto.factDate}})
        await updatedCar[0].$add('events', [event.id], { through: {factDate: carModel.factDate}})
        updatedCar[0].events = [event]
        return updatedCar[0];
    }

}
