import {SpeedReceivedEvent, SpeedInformationDTO} from './speedReceivedEvent';
import {ProviderInterface} from './providerInterface';
import * as $ from "jquery";
import * as SockJS from "sockjs";
import {ConnectedEvent} from './connectedEvent';

export class SocksJsProvider implements ProviderInterface {

    private messageCallbacks:JQueryCallback = $.Callbacks();
    private connectedCallbacks:JQueryCallback = $.Callbacks();
    private connected = false;

    connect() {
        let conn = new SockJS('http://localhost:1234/bike');

        conn.onmessage = (e) => {
            if (!this.connected) {
                console.log('Got Connected Event!');
                this.connectedCallbacks.fire(new ConnectedEvent(), this.connectedCallbacks);
                this.connected = true;
                return;
            }

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

    onConnected(callback:(p1:ConnectedEvent, p1:JQueryCallback)=>void) {
        this.connectedCallbacks.add(callback);
    }
}