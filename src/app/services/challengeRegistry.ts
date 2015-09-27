import {Challenge} from './challenge'
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';

@autoinject
export class ChallengeRegistry {
    private challenges:Challenge[];

    constructor() {
        this.load();
    }

    public registerNew(name:string):Challenge {
        var challenge = Challenge.createNew(name, this.challenges.length);
        this.challenges.push(challenge);

        this.save();
        return challenge;
    }

    public getResults():Challenge[] {
        return this.challenges;
    }

    public findChallenge(id:number) {
        for (var i in this.challenges) {
            if (!this.challenges.hasOwnProperty(i)) {
                continue;
            }
            var challenge = this.challenges[i];
            if (challenge.id == id) {
                return challenge;
            }
        }

        throw new Error('Challenge not found');
    }

    private load() {
        this.challenges = [];
        let loaded = localStorage.getItem('challenges');
        if (loaded) {
            try {
                let challenges:Object[] = JSON.parse(loaded);
                if (challenges) {
                    for (var i in challenges) {
                        if (!challenges.hasOwnProperty(i)) {
                            continue;
                        }
                        var item = challenges[i];
                        this.challenges.push(Challenge.unmarshal(item));
                    }
                }
            } catch (e) {
                this.challenges = [];
            }
        }
    }

    private save() {
        localStorage.setItem('challenges', JSON.stringify(this.challenges));
    }
}