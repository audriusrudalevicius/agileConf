import {Router} from 'aurelia-router';

export class App {
    router:Router;

    configureRouter(config, router:Router) {
        config.title = 'NFQ Bike Challenge';
        config.map([
            {route: ['', 'register'], moduleId: './register', nav: false, title: 'Challenge'},
            {route: 'run/:id', moduleId: './run', nav: false, title: 'Challenge'},
            {route: ['results/', 'results/:id'], moduleId: './results', nav: false, title: 'Results'}
        ]);

        this.router = router;
    }
}