import Ember from 'ember';
import SerializableStorage from 'ember-preferences/storage/serializable';
import { initialize } from 'dummy/instance-initializers/ember-preferences';
import { module, test } from 'qunit';
import sinon from 'sinon';

let application;

module('Unit | Initializer | configure preferences service', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('injects the service everywhere', function(assert) {
  var mock = sinon.mock(application);
  mock.expects('inject').withArgs('route', 'preferences', 'service:preferences');
  mock.expects('inject').withArgs('controller', 'preferences', 'service:preferences');
  mock.expects('inject').withArgs('component', 'preferences', 'service:preferences');

  initialize(application);

  assert.ok(mock.verify());
});

test('service is singleton and does not instantiates', function(assert) {
  initialize(application);

  assert.deepEqual(application.registeredOptions('service:preferences'), { singleton: true, instantiate: false });
});

test('registers localStorage as the storage', function(assert) {
  initialize(application);

  var service = application.resolveRegistration('service:preferences');

  assert.ok(service);
  assert.equal(service.get('_storage').constructor, SerializableStorage);
  assert.equal(service.get('_storage.content'), window.localStorage);
});
