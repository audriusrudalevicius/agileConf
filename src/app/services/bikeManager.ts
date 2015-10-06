import {SpeedService} from '../services/speed/speedService';
import {inject} from 'aurelia-framework';
import {GameSubscriber} from '../services/gameSubscriber';
import {ChallengeSubscriber} from '../services/challengeSubscriber';
import ProviderInterface from '../services/speed/provider/providerInterface';

@inject(GameSubscriber, ChallengeSubscriber)
export class BikeManager {
    private _speed:SpeedService;
    private gs:GameSubscriber;
    private cs:ChallengeSubscriber;
    private inited:boolean;

    constructor(gs:GameSubscriber, cs:ChallengeSubscriber) {
        this.gs = gs;
        this.cs = cs;
        this.inited = false;
    }

    public init(provider:ProviderInterface) {
        if (!provider) {
            throw new Error("No speed provider configured");
        }
        if (this.inited) {
            return;
        }
        this._speed = new SpeedService(provider);
        this.gs.subscribe();
        this.cs.subscribe();
        this.inited = true;
        console.info('Inilisation completed');
    }

    public get speed():SpeedService {
        return this._speed;
    }
}