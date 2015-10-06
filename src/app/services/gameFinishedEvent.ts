import {Challenge} from '../services/challenge';

export class GameFinishedEvent {
    private _challenge:Challenge;

    constructor(challenge:Challenge) {
        this._challenge = challenge;
    }

    public get challenge():Challenge {
        return this._challenge;
    }
}