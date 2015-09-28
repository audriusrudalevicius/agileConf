import {EventAggregator} from 'aurelia-event-aggregator';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import {GameFinishedEvent} from '../services/gameFinishedEvent';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BikeManager} from '../services/BikeManager';

@inject(EventAggregator, Router, ChallengeRegistry)
export class GameSubscriber {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;

    constructor(
        eventAggregator:EventAggregator,
        router:Router,
        registry:ChallengeRegistry
    ) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
    }

    subscribe() {
        this.eventAggregator.subscribe(GameFinishedEvent, payload => {
            BikeManager.speed.stopMonitors();
            this.registry.save();
            this.router.navigate('/results/' + payload.challenge.id);
        });
    }
}