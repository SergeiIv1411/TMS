import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Car } from '../cars/car.model';
import { CarEvents } from './car-events.model';

interface EventCreationAttrs {
    name: string;
    typeEvent: string;
    priority: number;
    active: boolean;
}

@Table({tableName: 'events', createdAt: false, updatedAt: false})
export class Event extends Model<Event, EventCreationAttrs> {
    @ApiProperty({example: 'a5ec76b0-a08c-11eb-bb9c-0050569425be', description: 'Уникальный идентификатор (идентификатор события в ERP)'})
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @ApiProperty({example:'Въезд на территорию', description: 'Название события'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @ApiProperty({example: 'Въезд', description: 'Тип события'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    typeEvent: string;

    @ApiProperty({example: '1', description: 'Приоритет события, в соответствии с приоритетом выстраиваются события на доске'})
    @Column({
        type: DataType.INTEGER,
    })
    priority: number;

    @ApiProperty({example: 'true', description: 'Если true - событие будет отображено на доске'})
    @Column({
        type: DataType.BOOLEAN,
    })
    active: boolean;

    @HasMany(() => Car)
    carsInEvent: Car[];

    @BelongsToMany(() => Car, () => CarEvents)
    cars: Car[];
}