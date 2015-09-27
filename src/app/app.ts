import {Router} from 'aurelia-router';

export class App {
    router:Router;

    configureRouter(config, router:Router){
        config.title = 'NFQ Bike Challenge';
        config.map([
            { route: ['','home'],  moduleId: './home',      nav: false, title:'Challenge' }
        ]);

        this.router = router;
    }
}