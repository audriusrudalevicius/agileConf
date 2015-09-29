import {SpeedReceivedEvent, SpeedInformationDTO} from './speedReceivedEvent';
import {ProviderInterface} from './providerInterface';
import * as $ from "jquery";
import * as SockJS from "sockjs";

export class SocksJsProvider implements ProviderInterface {

    private messageCallbacks:JQueryCallback = $.Callbacks();

    connect() {
        let conn = new SockJS('http://localhost:1234/bike');

        conn.onmessage = (e) => {
            this.messageCallbacks.fire(new SpeedReceivedEvent(<SpeedInformationDTO>e.data));
        };

        conn.onclose = (e) => {
            console.error("Disconnected from device");
            this.messageCallbacks.empty();
        }
    }

    onSpeedReceived(callback:(p1:SpeedReceivedEvent) => void) {
        this.messageCallbacks.add(callback);
    }

    clearCallbacks() {
        this.messageCallbacks.empty();
    }
}