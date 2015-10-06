import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import {BikeManager} from '../services/bikeManager';
import {Game} from '../services/game';
import * as $ from "jquery";

require('jquery-circle-progress');
const maxSpeed = 45; // circle progress max speed
const lastSeconds = 10; // circle progress max speed

@inject(EventAggregator, Router, ChallengeRegistry, Game, BikeManager)
export class Run {
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;
    private challenge:Challenge;
    private speedWidget:any;
    private game:Game;
    public lastSeconds:boolean = false;
    private bm:BikeManager;

    constructor(
        eventAggregator:EventAggregator,
        router:Router,
        registry:ChallengeRegistry,
        game:Game,
        bm:BikeManager
    ) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
        this.game = game;
        this.bm = bm;
    }

    activate() {
        try {
            this.challenge = this.registry.getCurrentChallenge();

            if (!this.challenge) {
                this.router.navigate('/results/');
                return;
            }
            // Start monitor for seed
            this.bm.speed.monitor((e) => {
                // Track game
                this.game.track(this.challenge, e);

                // Update ui last seconds class
                this.lastSeconds = (this.challenge.timeLeft < lastSeconds);

                // Update value on each event
                if (this.speedWidget) {
                    let percent = this.challenge.speed / maxSpeed;
                    this.speedWidget.circleProgress('value', percent);
                }
            });
        } catch (e) {
            console.error(e);
            this.router.navigate('register');
        }
    }

    attached() {

        // jquery attachments
        this.speedWidget = $('#speed').circleProgress({
            value: 0,
            size: 160,
            fill: {
                gradient: ["#FF6100"]
            }
        });
    }
}