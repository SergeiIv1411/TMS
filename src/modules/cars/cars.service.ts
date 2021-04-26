import { Inject, Injectable } from '@nestjs/common';
import { CAR_REPOSITORY } from 'src/core/constants';
import { Car } from './car.model';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
    constructor(@Inject(CAR_REPOSITORY) private readonly carRepository: typeof Car) {}        

    async create(dto: CreateCarDto) {
        const car = await this.carRepository.create({...dto})
        return car;
    }

    async getById(id: string) {
        const car = await this.carRepository.findByPk(id);
        return car;
    }

    async update(id: string, carModel: CreateCarDto) {
        const [updatedEvent] = await this.carRepository.update({ ...carModel, id }, { where: { id }, returning: true });

        return updatedEvent;
    }

}
