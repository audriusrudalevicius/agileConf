import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import {BikeManager} from '../services/BikeManager';
import * as $ from "jquery";

require('jquery-circle-progress');
const maxSpeed = 40;

@inject(EventAggregator, Router, ChallengeRegistry)
export class Run {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;
    private challenge:Challenge;
    private speedWidget:any;

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
            BikeManager.speed.monitor((e) => {
                this.challenge.speed = e.payload.speed;

                if (this.speedWidget) {
                    let percent = this.challenge.speed / maxSpeed;
                    this.speedWidget.circleProgress('value', percent);
                }
            });
        } catch (e) {
            console.error(e);
            this.router.navigate('/');
        }
    }

    attached() {
        this.speedWidget = $('#speed').circleProgress({
            value: 0,
            size: 200,
            fill: {
                gradient: ["#FF6100"]
            }
        });
    }
}