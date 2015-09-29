import {MockProvider} from '../services/speed/provider/mockProvider';
import {SocksJsProvider} from '../services/speed/provider/socksJsProvider';
import {SpeedService} from '../services/speed/speedService';

export class BikeManager {
    private static _speed:SpeedService;

    constructor() {
    }

    public static init() {
        let provider = new MockProvider();
        this._speed = new SpeedService(provider);
    }

    public static get speed():SpeedService {
        return this._speed;
    }
}