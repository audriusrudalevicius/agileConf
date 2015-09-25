import {Component, View, bootstrap, ApplicationRef} from 'angular2/angular2';

@Component({
    selector: 'nfq-app'
})
@View({
    template: `
    <div class="row">
      <div class="pages">
        <div class="adaptive-mobile">
          <div class="well page active bs-component registration-form">
            <form class="form-horizontal">
              <fieldset>
                <legend>Bike Challenge - Registration</legend>
                <div class="form-group">
                    <div class="col-lg-9 col-lg-offset-1">
                      <input class="form-control floating-label" type="text" placeholder="Enter persons name" data-hint="You should really write something here">
                    </div>
                </div>
                <div class="form-group">
                </div>
                <div class="form-group buttons-row">
                  <div class="col-lg-10 col-lg-offset-1">
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
    constructor() {
    }
}

bootstrap(BikeChallenge).then((ref:ApplicationRef) => {
    $.material.init();
});
