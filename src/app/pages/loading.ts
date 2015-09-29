import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BikeManager} from '../services/BikeManager';

@inject(Router)
export class Loading {
    private router:Router;

    constructor(router:Router) {
        this.router = router;
    }

    attached() {
        BikeManager.speed.onSignal(() => {
            this.router.navigate('register');
        });
    }
}