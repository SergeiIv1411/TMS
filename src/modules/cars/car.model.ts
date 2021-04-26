import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface CarCreationAttrs {
    docNumber: string;
    arivalDate: Date;
    contragent: string;
    plombNumber: string;
    gosNumber: string;
    conNum: string;
    warehouse: string;
    driver: string;
    driverPhone: string;
    description: string;    
    author: string;  
}

@Table({tableName: 'cars'})
export class Car extends Model<Car, CarCreationAttrs> {
    @ApiProperty({example: 'a5ec76b0-a08c-11eb-bb9c-0050569425be', description: 'Уникальный идентификатор (идентификатор документа в ERP)'})
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example:'1', description: 'номер документа в базе ERP'})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    docNumber: string;

    @ApiProperty({example: new Date, description: 'Дата планируемого въезда'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    arivalDate: Date;

    @ApiProperty({example: 'ВЭД Брит Чехия', description: 'Контрагент/ Поставщик'})
    @Column({
        type: DataType.STRING,
    })
    contragent: string;

    @ApiProperty({example: '36521114', description: 'Номер пломбы'})
    @Column({
        type: DataType.STRING,
    })
    plombNumber: string;
    
    @ApiProperty({example: 'ПР 1111 ОР 876', description: 'Гос. номер автомобиля'})
    @Column({
        type: DataType.STRING,
    })
    gosNumber: string;

    @ApiProperty({example: '2343241143', description: 'Номер контейнера'})
    @Column({
        type: DataType.STRING,
    })
    conNum: string;

    @ApiProperty({example: 'Зоотерминал 6й корпус', description: 'Склад назначения'})
    @Column({
        type: DataType.STRING,
    })
    warehouse: string;

    @ApiProperty({example: 'Зимин А.', description: 'Водитель'})
    @Column({
        type: DataType.STRING,
    })
    driver: string;

    @ApiProperty({example: '8-999-999-99-99', description: 'Телефон водителя'})
    @Column({
        type: DataType.STRING,
    })
    driverPhone: string;

    @ApiProperty({example: 'Доставка пиццы', description: 'Описание заявки'})
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ApiProperty({example: 'Крылова Н.', description: 'Автор заявки'})
    @Column({
        type: DataType.STRING,
    })
    author: string;
}