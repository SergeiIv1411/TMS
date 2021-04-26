import { Event } from './events.model';
import { EVENT_REPOSITORY } from '../../core/constants';

export const eventsProviders = [{
    provide: EVENT_REPOSITORY,
    useValue: Event,
}];