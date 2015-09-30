import {Challenge} from './challenge'
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-framework';

@autoinject
export class ChallengeRegistry {
    private challenges:Challenge[];
    private currentChallenge:Challenge[];

    constructor() {
        this.load();
    }

    public registerNew(name:string):Challenge {
        this.currentChallenge = Challenge.createNew(name, this.challenges.length);

        return this.currentChallenge;
    }

    public getResults():Challenge[] {
        return this.challenges;
    }

    public findChallenge(id:number):Challenge {
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

    public findChallengeByName(name:string):Challenge {
        for (var i in this.challenges) {
            if (!this.challenges.hasOwnProperty(i)) {
                continue;
            }
            var challenge = this.challenges[i];
            if (challenge.name == name) {
                return challenge;
            }
        }

        throw new Error('Challenge not found');
    }

    private load() {
        console.log('Loading data');
        this.challenges = [];
        let loaded = localStorage.getItem('challenges');
        if (!loaded) {
            console.log('Data not found');
            return;
        }
        try {
            let challenges:Object[] = JSON.parse(loaded);
            if (challenges) {
                for (var i in challenges) {
                    if (!challenges.hasOwnProperty(i)) {
                        continue;
                    }
                    var item = challenges[i];
                    try {
                        let ch = Challenge.unmarshal(item);
                        try {
                            let dup = this.findChallenge(ch.id);
                            console.error("Found duplicated", item, dup);
                        } catch (e1) {
                            this.challenges.push(ch);
                        }
                    } catch (e2) {
                        console.error("Failed load", item, e2);
                    }
                }
                console.log('Data Loaded with count: ', challenges.length, challenges);
            }
        } catch (e) {
            console.log('Error loading data', e);
            this.challenges = [];
        }
    }

    public add(challenge:Challenge) {
        this.challenges.push(challenge);
    }

    public save() {
        localStorage.setItem('challenges', JSON.stringify(this.challenges));
    }
}
