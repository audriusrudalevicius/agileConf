import {SpeedReceivedEvent} from './speedReceivedEvent';
export interface ProviderInterface {
    connect()
    onSpeedReceived(callback:(p1:SpeedReceivedEvent) => void);
}