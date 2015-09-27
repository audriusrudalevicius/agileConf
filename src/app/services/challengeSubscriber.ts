import {EventAggregator} from 'aurelia-event-aggregator';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import {NewChallengeEvent} from '../services/newChallengeEvent';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(EventAggregator, Router, ChallengeRegistry)
export class ChallengeSubscriber {
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
        this.eventAggregator.subscribe(NewChallengeEvent, payload => {
            var challenge = this.registry.registerNew(payload.name);
            this.router.navigate('/run/' + challenge.id);
        });
    }
}