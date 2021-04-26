import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface EventCreationAttrs {
    name: string;
    guid: string;
    typeEvent: string;
    priority: number;
    active: boolean;
}

@Table({tableName: 'events'})
export class Event extends Model<Event, EventCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'a5ec76b0-a08c-11eb-bb9c-0050569425be', description: 'Идентификатор события в базе ERP'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    guid: string;

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
}