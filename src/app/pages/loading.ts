import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {BikeManager} from '../services/bikeManager';

@inject(Router, BikeManager)
export class Loading {
    private router:Router;
    private bm:BikeManager;

    constructor(router:Router, bm:BikeManager) {
        this.router = router;
        this.bm = bm;
    }

    attached() {
        this.bm.speed.onSignal(() => {
            this.router.navigate('register');
        });
    }
}