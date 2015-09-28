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
}