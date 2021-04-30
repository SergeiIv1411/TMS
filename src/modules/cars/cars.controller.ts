import { Body, Controller, Get, Inject, Param, Put, Query } from "@nestjs/common";
import { ClientProxy, EventPattern } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Car } from "./car.model";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";

const getPagination = (page, size, sort, Desc) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    let sortBy = "arivalDate";
    let sortDesc = true; 
    if (sort) {
        sortBy = sort;
        sortDesc = Desc; 
    }

    return { limit, offset, sortBy, sortDesc };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

@ApiTags('Заявка на въезд')
@Controller('cars')
export class CarsController {
    constructor(
        private carsService: CarsService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) { }

    @ApiOperation({ summary: 'Получить все заявки на въезд' })
    @ApiResponse({ status: 200, type: [Car] })
    @Get()
    async getAll(@Query('page') page: Number, @Query('size') size: Number,
        @Query('sortBy') sort: string, @Query('sortDesc') Desc: boolean) {
        
        const { limit, offset, sortBy, sortDesc } = getPagination(page, size, sort, Desc);
        const cars = await this.carsService.getAll(limit, offset, sortBy, sortDesc);
        return getPagingData(cars, page, limit);

    }

    @ApiOperation({ summary: 'Обновить данные по заявке на въезд' })
    @ApiResponse({ status: 200, type: Car })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCarDto: CreateCarDto) {
        this.client.emit('update_car', updateCarDto);
        return await this.carsService.update(id, updateCarDto);

    }

    @EventPattern('change_Car')
    async uploadCarFromERP(data: string) {
        let carModel = new CreateCarDto();

        carModel = JSON.parse(data);
        const arivalDate = new Date(carModel.arivalDate);
        const factDate = new Date(carModel.factDate);
        const id = carModel.id;
        const carFromDB = await this.carsService.getById(id);
        if (carFromDB) {
            await this.carsService.update(carFromDB.id, { ...carModel, arivalDate, factDate })
        } else {
            await this.carsService.create({ ...carModel, arivalDate, factDate });
        }

    }
}