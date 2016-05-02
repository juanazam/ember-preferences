import Ember from 'ember';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';
import { setup } from 'ember-preferences/setup';
import { module, test } from 'qunit';
import sinon from 'sinon';

var application;

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

  setup(application, {});

  assert.ok(mock.verify());
});

test('service is singleton and does not instantiates', function(assert) {
  setup(application, {});

  assert.deepEqual(application.registeredOptions('service:preferences'), { singleton: true, instantiate: false });
});

test('registers localStorage with namespaceable as the storage', function(assert) {
  setup(application, { namespace: 'foo' });

  var service = application.resolveRegistration('service:preferences');

  assert.ok(service);
  assert.equal(service.get('_storage').constructor, NamespaceableStorage);
  assert.equal(service.get('_storage.content').constructor, SerializableStorage);
  assert.equal(service.get('_storage.content.content'), window.localStorage);
});

test('does not use namespaceable storage when namespaces is false', function(assert) {
  setup(application, { namespace: false });

  var service = application.resolveRegistration('service:preferences');

  assert.ok(service);
  assert.equal(service.get('_storage').constructor, SerializableStorage);
  assert.equal(service.get('_storage.content'), window.localStorage);
});
