import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ChallengeRegistry} from '../services/challengeRegistry';
import {Challenge} from '../services/challenge';
import * as $ from "jquery";
import * as Ps from "perfect-scrollbar";

@inject(EventAggregator, Router, ChallengeRegistry)
export class Results {
    public searchName:string = '';
    public place:string;
    private _results:Challenge[];
    private eventAggregator:EventAggregator;
    private router:Router;
    private registry:ChallengeRegistry;
    private challenge:Challenge;
    private timer:any;
    private scroll:any;

    constructor(public eventAggregator:EventAggregator,
                public router:Router,
                public registry:ChallengeRegistry) {
        this.eventAggregator = eventAggregator;
        this.router = router;
        this.registry = registry;
    }

    activate(params) {
        try {
            this.challenge = this.registry.findChallengeByName(params.id);
            this.place = this.getPlace();
        } catch (e) {

        }
    }

    private getPlace():number {
        if (!this.challenge) {
            return;
        }
        var results = this.results.sort((a, b) => {
            return (a.distance - b.distance) * -1;
        });
        for (var i in results) {
            if (!results.hasOwnProperty(i)) {
                continue;
            }
            var result = results[i];
            if (result.id == this.challenge.id) {
                return (parseInt(i) + 1);
            }
        }
    }

    public get results():Challenge[] {
        if (this._results == null) {
            this._results = this.registry.getResults().filter((c) => {
                return (c.timeLeft <= 0);
            });
        }

        return this._results;
    }

    public attached() {
        this.scroll = document.getElementById('result-table');
        let scroll = $(this.scroll);
        Ps.initialize(this.scroll);
        let currentEl = $('#result-table tr.current');

        if (currentEl && currentEl.length) {
            this.scroll.scrollTop = (currentEl.offset().top - scroll.offset().top) - (currentEl.height() / 2 + scroll.height() / 2);
            Ps.update(this.scroll);
        }
    }

    public search() {
        $('#result-table .r-item').removeClass('found');
        let found = $('#result-table [data-name^="' + this.escapeStr(this.searchName.toLowerCase()) + '"]');
        let scroll = $(this.scroll);
        if (found.length > 0) {
            found.addClass('found');
            this.timer = setTimeout(() => {
                let scrollPos = this.scroll.scrollTop;
                let currentPosElement = found.position().top;
                this.scroll.scrollTop = (scrollPos + currentPosElement) - (found.height() / 2 + scroll.height() / 2);
                Ps.update(this.scroll);
            }, 250);
        }
    }

    private escapeStr(str) {
        if (str)
            return str.replace(/(['"[\]])/g, '\\$1');

        return str;
    }
}