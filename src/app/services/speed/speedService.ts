import ProviderInterface from './provider/providerInterface';
import SpeedReceivedEvent from './provider/speedReceivedEvent';

export class SpeedService {
    private provider:ProviderInterface;

    constructor(provider:ProviderInterface) {
        this.provider = provider;
    }

    public monitor(callback: (p1: SpeedReceivedEvent) => void) {
        this.provider.connect();
        this.provider.onSpeedReceived(callback);
    }
}