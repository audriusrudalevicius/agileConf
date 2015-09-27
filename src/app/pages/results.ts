import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';

@inject(EventAggregator, Router, ChallengeRegistry)
export class Results {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;
    private challenge:Challenge;

    constructor(
        public eventAggregator:EventAggregator,
        public router:Router,
        public registry:ChallengeRegistry
    ) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
    }

    activate(params) {
        try {
            this.challenge = this.registry.findChallenge(params.id);
        } catch (e) {

        }
    }

    public get results():Challenge[] {
        return this.registry.getResults().sort((a, b) => {
            return (a.place - b.place) + (a.maxSpeed - b.maxSpeed);
        });
    }
}