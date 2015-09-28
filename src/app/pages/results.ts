import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';

@inject(EventAggregator, Router, ChallengeRegistry)
export class Results {
    public searchName:string;
    public place:string;
    private _results:Challenge[];
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
            this.place = this.getPlace();
        } catch (e) {

        }
    }

    private getPlace():number {
        if (!this.challenge) {
            return;
        }
        var results = this.results.sort((a, b) => {
            return (a.distance - b.distance) * -1;
        });
        for (var i in results) {
            if (!results.hasOwnProperty(i)) {
                continue;
            }
            var result = results[i];
            if (result.id == this.challenge.id) {
                return (parseInt(i) + 1);
            }
        }
    }

    public get results():Challenge[] {
        if (this._results == null) {
            this._results = this.registry.getResults().filter((c) => {
                return (c.timeLeft <= 0);
            });
        }

        return this._results;
    }
}