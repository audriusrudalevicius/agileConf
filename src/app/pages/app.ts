import {Router} from 'aurelia-router';
import {BikeManager} from '../services/BikeManager';

export class App {

    router:Router;

    constructor() {
        BikeManager.init();
    }

    configureRouter(config, router:Router) {
        config.title = 'NFQ Bike Challenge';
        config.map([
            {route: ['', 'home'], moduleId: './loading', nav: false, title: 'Challenge'},
            {route: 'register', moduleId: './register', nav: false, title: 'Challenge', name: 'register'},
            {route: 'run', moduleId: './run', nav: false, title: 'Challenge', name: 'run'},
            {route: ['results/', 'results/:id'], moduleId: './results', nav: false, title: 'Results', name: 'results'}
        ]);

        this.router = router;
    }
}
