import {ProviderInterface} from './providerInterface';
import {SpeedReceivedEvent, SpeedInformationDTO} from './speedReceivedEvent';

export class MockProvider implements ProviderInterface {

    private messageCallbacks:JQueryCallback = $.Callbacks();

    onSpeedReceived(callback:(p1:SpeedReceivedEvent)=>void) {
        this.messageCallbacks.add(callback);
    }

    connect() {
        var revs = 1;
        setTimeout(() => {
            this.messageCallbacks.fire(new SpeedReceivedEvent(<SpeedInformationDTO>{
                revolutions: revs,
                speed: MockProvider.getRandomInt(1, 40)
            }));
            revs++;
        }, 2000);
    }

    private static getRandomInt(min, max):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}