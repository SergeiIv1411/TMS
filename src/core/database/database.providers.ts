import { Sequelize } from 'sequelize-typescript';
import { Car } from 'src/modules/cars/car.model';
import { CarEvents } from 'src/modules/events/car-events.model';
import { Event } from 'src/modules/events/events.model';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([Event, Car, CarEvents]);
        await sequelize.sync();
        return sequelize;
    },
}];