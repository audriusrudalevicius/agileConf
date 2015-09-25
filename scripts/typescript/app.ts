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
                <div class="form-group first-row">
                    <div class="col-lg-12">
                      <input class="form-control" type="text" placeholder="Enter your name..">
                    </div>
                </div>
                <div class="form-group">
                </div>
                <div class="form-group buttons-row">
                  <div class="col-lg-12">
                    <button type="submit" class="col-lg-12 btn btn-material-blue-grey btn-lg btn-raised">Accept Challenge</button>
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
