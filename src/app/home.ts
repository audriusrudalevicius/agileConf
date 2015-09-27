import {computedFrom} from 'aurelia-framework';

export class Home {
    name = '';

    register(e){
        e.preventDefault();

        alert(`Welcome, ${this.name}!`);
    }
}