/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'nfq-app'
})
@View({
  template: `
    <div class="row">
      <div class="pages col-xs-8">
        <div class="col-xs-10 adaptive-mobile">
          <div class="well page active bs-component">
            <form class="form-horizontal">
              <fieldset>
                <legend>Bike Challenge - Registration</legend>
                <div class="form-group">
                    <div class="form-control-wrapper col-lg-9 col-lg-offset-1">
                      <input class="form-control empty" id="focusedInput" type="email" data-hint="You should really write something here">
                      <div class="floating-label">Enter name</div>
                      <div class="hint">Persons name</div>
                      <span class="material-input"></span>
                    </div>
                </div>
                <div class="form-group">
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-material-blue-grey btn-lg">Submit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>`
})

class BikeChallenge {
  name:string;

  constructor() {
  }
}

bootstrap(BikeChallenge);
