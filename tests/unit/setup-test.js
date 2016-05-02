import Ember from 'ember';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespeceableStorage from 'ember-preferences/storage/namespaceable';
import preferences from 'dummy/preferences';
import { setup } from 'ember-preferences/setup';
import { module, test } from 'qunit';
import sinon from 'sinon';

let application;

module('Unit | Setup | configure preferences service', {
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

  setup(application, preferences);

  assert.ok(mock.verify());
});

test('service is singleton and does not instantiates', function(assert) {
  setup(application, preferences);

  assert.deepEqual(application.registeredOptions('service:preferences'), { singleton: true, instantiate: false });
});

test('registers localStorage as the storage', function(assert) {
  setup(application, preferences);

  var service = application.resolveRegistration('service:preferences');

  assert.ok(service);
  assert.equal(service.get('_storage').constructor, NamespeceableStorage);
  assert.equal(service.get('_storage.content').constructor, SerializableStorage);
  assert.equal(service.get('_storage.content.content'), window.localStorage);
});
