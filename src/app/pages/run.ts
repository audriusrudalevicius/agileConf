import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';

@inject(EventAggregator, Router, ChallengeRegistry)
export class Run {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;
    private challenge:Challenge;

    constructor(
        eventAggregator:EventAggregator,
        router:Router,
        registry:ChallengeRegistry
    ) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
    }

    activate(params) {
        try {
            this.challenge = this.registry.findChallenge(params.id);
        } catch (e) {
            this.router.navigate('/');
        }
    }
}