import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";

@ApiTags('Заявка на въезд')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {}


    @EventPattern('change_Car')
    async uploadCarFromERP(data: string) {
        let carModel = new CreateCarDto();
        
        carModel = JSON.parse(data);
        let date = new Date(carModel.arivalDate);
        const id = carModel.id;
        const carFromDB = await this.carsService.getById(id);
        if (carFromDB) {
            await this.carsService.update(carFromDB.id, carModel)
        } else {
            await this.carsService.create(carModel);
        }
        
    }
}