import {Challenge} from './challenge'
import {EventAggregator} from 'aurelia-event-aggregator';

export class ChallengeRegistry {
    private challenges:Challenge[];
    private newChallenge:Challenge;

    constructor() {
        this.load();
    }

    public registerNew(name:string):Challenge {
        this.newChallenge = Challenge.createNew(name);

        return this.newChallenge;
    }

    public getResults():Challenge[] {
        return this.challenges;
    }

    public getCurrentChallenge():Challenge {
        if (this.newChallenge) {
            return this.newChallenge;
        }

        throw new Error('Challenge not found');
    }

    public findChallengeIndex(name:string):number {
        let lName = name.toLowerCase();
        for (let i in this.challenges) {
            if (!this.challenges.hasOwnProperty(i)) {
                continue;
            }
            var challenge = this.challenges[i];
            if (challenge.name.toLowerCase() == lName) {
                return i;
            }
        }

        throw new Error('Challenge not found');
    }

    public findChallengeByName(name:string):Challenge {
        let lName = name.toLowerCase();
        for (let i in this.challenges) {
            if (!this.challenges.hasOwnProperty(i)) {
                continue;
            }
            var challenge = this.challenges[i];
            if (challenge.name.toLowerCase() == lName) {
                return challenge;
            }
        }

        throw new Error('Challenge not found');
    }

    /**
     * Loading with automatic recovery on duplicated data.
     */
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
                for (let item of challenges) {
                    try {
                        let ch = Challenge.unmarshal(item);
                        if (ch.name.toLowerCase().indexOf('test') != -1) {
                            continue;
                        }
                        try {
                            let dup = this.findChallengeByName(ch.name);
                            if (dup.distance < ch.distance) {
                                let index = this.findChallengeIndex(ch.name);
                                this.challenges[index] = ch;
                                console.warn("Found duplicated adding best", item, dup);
                            } else {
                                console.warn("Found duplicated skipping", item, dup);
                            }
                        } catch (e1) {
                            this.challenges.push(ch);
                        }
                    } catch (e2) {
                        console.error("Failed load", item, e2);
                    }
                }
            }
        } catch (e) {
            console.log('Error loading data', e);
            this.challenges = [];
        }
    }

    public add(challenge:Challenge) {
        try {
            let found = this.findChallengeIndex(challenge.name);
            this.challenges[found] = challenge;
        } catch (e) {
            this.challenges.push(challenge);
        }
    }

    public save() {
        localStorage.setItem('challenges', JSON.stringify(this.challenges));
    }
}
