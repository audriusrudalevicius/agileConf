import {App} from '../../src/app/pages/app.ts';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut
    , mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App(mockedRouter);
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('NFQ Bike Challenge');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['','register'], moduleId: './register', nav: false, title:'Challenge' });
  });

  it('should have a users route', () => {
     expect(sut.router.routes).toContain({ route: 'run/:id', moduleId: './run', nav: false, title:'Challenge' });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContain({route: ['results/', 'results/:id'], moduleId: './results', nav: false, title: 'Results', name: 'results'});
  });
});
