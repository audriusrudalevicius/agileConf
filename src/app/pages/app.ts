import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {BikeManager} from '../services/bikeManager';
import {MockProvider} from '../services/speed/provider/mockProvider';
import {SocksJsProvider} from '../services/speed/provider/socksJsProvider';

@inject(BikeManager)
export class App {

    router:Router;

    constructor(bm:BikeManager) {
        bm.init(new MockProvider());
    }

    configureRouter(config, router:Router) {
        config.title = 'NFQ Bike Challenge';
        config.map([
            {route: ['', 'home'], moduleId: './loading', nav: false, title: 'Challenge'},
            {route: 'register', moduleId: './register', nav: false, title: 'Challenge', name: 'register'},
            {route: 'run', moduleId: './run', nav: false, title: 'Challenge', name: 'run'},
            {route: ['results/', 'results/:name'], moduleId: './results', nav: false, title: 'Results', name: 'results'}
        ]);

        this.router = router;
    }
}
