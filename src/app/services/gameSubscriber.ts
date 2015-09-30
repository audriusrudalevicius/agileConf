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

            if (this.isBestResult(payload.challenge)) {
                this.registry.add(payload.challenge);
                this.registry.save();
                this.router.navigate('/results/' + payload.challenge.id);
            }

            this.router.navigate('results');
        });
    }

    isBestResult(currentChallenge:Challenge) {
        try {
            var previousChallenge = this.registry.findChallengeByName(currentChallenge.name);
            return currentChallenge.distance > previousChallenge.distance;

        } catch (e) {
            return true;
        }
    }
}
