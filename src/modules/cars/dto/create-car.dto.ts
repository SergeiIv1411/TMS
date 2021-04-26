import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
    @ApiProperty({example: 'a5ec76b0-a08c-11eb-bb9c-0050569425be', description: 'Уникальный идентификатор документа в базе ERP'})
    readonly id: string;
    @ApiProperty({example:'1', description: 'номер документа в базе ERP'})
    readonly docNumber: string;
    @ApiProperty({example: new Date, description: 'Дата планируемого въезда'})
    readonly arivalDate: Date;
    @ApiProperty({example: 'ВЭД Брит Чехия', description: 'Контрагент/ Поставщик'})
    readonly contragent: string;
    @ApiProperty({example: 'ДЖ0987ВА', description: 'Номер контейнера'})
    readonly conNum: string;
    @ApiProperty({example: '36521114', description: 'Номер пломбы'})
    readonly plombNumber: string;
    @ApiProperty({example: 'ПР 1111 ОР 876', description: 'Гос. номер автомобиля'})
    readonly gosNumber: string;
    @ApiProperty({example: 'Зоотерминал 6й корпус', description: 'Склад назначения'})
    readonly warehouse: string;
    @ApiProperty({example: 'Зимин А.', description: 'Водитель'})
    readonly driver: string;
    @ApiProperty({example: '8-999-999-99-99', description: 'Телефон водителя'})
    readonly driverPhone: string;
    @ApiProperty({example: 'Доставка пиццы', description: 'Описание заявки'})
    readonly description: string;
    @ApiProperty({example: 'Крылова Н.', description: 'Автор заявки'})
    readonly author: string;

    
}
