import {ProviderInterface} from './providerInterface';
import {SpeedReceivedEvent} from './speedReceivedEvent';

export class MockProvider implements ProviderInterface {
    onSpeedReceived(callback:(p1:SpeedReceivedEvent)=>void):any {
        return undefined;
    }

    onSpeedReceived(callback:(p1:SpeedReceivedEvent)=>void) {
    }
    connect() {
    }

}