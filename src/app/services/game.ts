import {inject} from 'aurelia-framework';
import {Challenge} from '../services/challenge';
import {GameFinishedEvent} from '../services/gameFinishedEvent';
import {EventAggregator} from 'aurelia-event-aggregator';

const CIRCUMFERENCE = 0.3 * 2 * 3.14;

@inject(EventAggregator)
export class Game {

    private timer;
    private em:EventAggregator;

    constructor(em:EventAggregator) {
        this.em = em;
    }

    public track(challenge:Challenge, event) {
        let speed;
        if (event.payload.speed > 0) {
            speed = event.payload.speed * 3.6;
        } else {
            speed = 0;
        }

        if (!challenge.maxSpeed || challenge.maxSpeed < speed) {
            challenge.maxSpeed = speed;
        }

        challenge.speed = speed;
        challenge.revolutionsEnded = event.payload.revolutions;

        if (challenge.revolutionsStarted != null) {
            challenge.distance = Math.floor((challenge.revolutionsEnded - challenge.revolutionsStarted) * CIRCUMFERENCE);
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
                clearInterval(this.timer);
                this.em.publish(new GameFinishedEvent(challenge));
                return;
            }
            challenge.timeLeft--;
        }, 1000);
    }
}
