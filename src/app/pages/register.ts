import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {ChallengeSubscriber} from '../services/challengeSubscriber';
import {Challenge} from '../services/challenge';
import {NewChallengeEvent} from '../services/newChallengeEvent';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, ChallengeSubscriber)
export class Home {
    public name = '';
    public isEmpty = true;
    private eventAggregator:EventAggregator;

    constructor(
        eventAggregator:EventAggregator,
        challengeSubscriber:ChallengeSubscriber
    ){
        this.eventAggregator = eventAggregator;
        challengeSubscriber.subscribe();
    }

    check(e) {
        this.isEmpty = (this.name.length < 1);
    }
    register(e){
        e.preventDefault();
        if (this.name.length > 1) {
            this.eventAggregator.publish(
                new NewChallengeEvent(this.name)
            );

            return;
        }
        alert('Enter your name');
    }
}