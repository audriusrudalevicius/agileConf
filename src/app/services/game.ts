import {inject} from 'aurelia-framework';
import {Challenge} from '../services/challenge';
import {GameFinishedEvent} from '../services/gameFinishedEvent';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {BikeManager} from './bikeManager';

const CIRCUMFERENCE = 0.3 * 2 * 3.14;

@inject(EventAggregator, ChallengeRegistry, BikeManager)
export class Game {

    private timer;
    private em:EventAggregator;
    private challengeRegistry:ChallengeRegistry;
    private bm:BikeManager;

    constructor(em:EventAggregator, challengeRegistry:ChallengeRegistry, bm:BikeManager) {
        this.em = em;
        this.challengeRegistry = challengeRegistry;
        this.bm = bm;
    }

    public track(challenge:Challenge, event) {
        let speed;
        if (event.payload.speed > 0) {
            // Convert m/s to km/h
            speed = event.payload.speed * 3.6;
        } else {
            speed = 0;
        }

        if (!challenge.maxSpeed || challenge.maxSpeed < speed) {
            challenge.maxSpeed = speed;
        }

        challenge.speed = speed;

        challenge.events++;
        if (challenge.events < 2) {
            return;
        }

        challenge.revolutionsEnded = event.payload.revolutions;

        if (challenge.revolutionsStarted != null) {
            // Add random number to fix device accuracy
            challenge.rnd = (Math.random() * 0.100);
            challenge.distance = (challenge.revolutionsEnded - challenge.revolutionsStarted) * CIRCUMFERENCE + challenge.rnd;
        }

        // Starting game
        if (challenge.started) {
            return;
        }
        challenge.markAsStarted();
        challenge.revolutionsStarted = event.payload.revolutions;
        this.startGame(challenge);
    }

    private startGame(challenge:Challenge) {
        this.timer = setInterval(() => {
            if (challenge.timeLeft <= 0 && challenge.started) {
                if (!this.timer) return;
                this.bm.speed.stopMonitors();
                clearInterval(this.timer);
                this.em.publish(new GameFinishedEvent(challenge));
                return;
            }
            challenge.timeLeft--;
        }, 1000);
    }
}
