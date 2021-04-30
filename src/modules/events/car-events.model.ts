import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Car} from "../cars/car.model";
import {Event} from "./events.model";


@Table({tableName: 'car_events', createdAt: false, updatedAt: false})
export class CarEvents extends Model<CarEvents> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Event)
    @Column({type: DataType.STRING})
    eventId: string;

    @ForeignKey(() => Car)
    @Column({type: DataType.STRING})
    carId: string;

    @Column({type: DataType.DATE, allowNull: false})
    factDate: Date;

}