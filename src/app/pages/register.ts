import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Challenge} from '../services/challenge';
import {NewChallengeEvent} from '../services/newChallengeEvent';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as $ from "jquery";

@inject(EventAggregator)
export class Home {
    public name = '';
    public isEmpty = true;
    private eventAggregator:EventAggregator;

    constructor(
        eventAggregator:EventAggregator
    ){
        this.eventAggregator = eventAggregator;
    }

    check(e) {
        this.isEmpty = (this.name.length < 1);
    }
    register(e){
        e.preventDefault();
        if (this.name.trim().length > 1) {
            this.eventAggregator.publish(
                new NewChallengeEvent(this.name.trim())
            );
        }
    }

    public attached() {
        $('input[type="text"]').focus();
    }
}