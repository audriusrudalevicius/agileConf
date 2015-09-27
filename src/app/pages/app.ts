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
            {route: ['', 'register'], moduleId: './register', nav: false, title: 'Challenge'},
            {route: 'run/:id', moduleId: './run', nav: false, title: 'Challenge'},
            {route: ['results/', 'results/:id'], moduleId: './results', nav: false, title: 'Results', name: 'results'}
        ]);

        this.router = router;
    }
}