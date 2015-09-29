import ProviderInterface from './provider/providerInterface';
import SpeedReceivedEvent from './provider/speedReceivedEvent';

export class SpeedService {
    private provider:ProviderInterface;

    constructor(provider:ProviderInterface) {
        this.provider = provider;
        this.provider.connect();
    }

    public monitor(callback: (p1: SpeedReceivedEvent) => void) {
        this.provider.onSpeedReceived(callback);
    }

    public stopMonitors() {
        this.provider.clearCallbacks();
    }

    public onSignal(f:Function) {
        var fired = false;
        var c = (e, cb:JQueryCallback) => {
            if (!fired) {
                f.call(window);
                fired = true;
                cb.remove(c);
            }
        };

        this.provider.onSpeedReceived(c);
    }
}