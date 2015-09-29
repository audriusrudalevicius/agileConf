import {SpeedReceivedEvent} from './speedReceivedEvent';
import {ConnectedEvent} from './connectedEvent';
export interface ProviderInterface {
    connect()
    onSpeedReceived(callback:(p1:SpeedReceivedEvent, cb:JQueryCallback) => void);
    clearCallbacks();
    onConnected(callback:(p1:ConnectedEvent, cb:JQueryCallback) => void)
}