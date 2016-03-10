import Ember from 'ember';
import { initialize } from 'dummy/initializers/inject-preferences';
import { module, test } from 'qunit';
import sinon from 'sinon';

let application;

module('Unit | Initializer | inject preferences', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  var mock = sinon.mock(application);
  mock.expects('inject').withArgs('route', 'preferences', 'service:preferences');
  mock.expects('inject').withArgs('controller', 'preferences', 'service:preferences');
  mock.expects('inject').withArgs('component', 'preferences', 'service:preferences');

  initialize(application);

  assert.ok(mock.verify());
});
