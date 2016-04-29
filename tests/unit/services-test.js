import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import SerializableStorage from 'ember-preferences/storage/serializable';
/* global localStorage */

var { computed } = Ember;

moduleFor('service:preferences', 'Unit | Service | preferences', {
  beforeEach() {
    localStorage.clear();
  }
});

test('store preference in local storage', function(assert) {
  let service = this.subject({ _storage: SerializableStorage.create({ content: localStorage }) });
  service.set('foo', { value: 'bar' });

  assert.equal(JSON.parse(localStorage.getItem('foo')).value, 'bar');
});

test('fetch preference from local storage', function(assert) {
  let service = this.subject({ _storage: SerializableStorage.create({ content: localStorage }) });
  localStorage.setItem('baz', JSON.stringify({ value: 'qux', expiresAt: new Date() }));

  assert.equal(service.get('baz').value, 'qux');
});

test('notifies when a property changes', function(assert) {
  let service = this.subject({ _storage: SerializableStorage.create({ content: localStorage }) });
  let object = Ember.Object.create({
    preferences: service,
    bar: computed.alias('preferences.foo')
  });

  assert.equal(object.get('bar'), null);

  service.set('foo', { value: 'baz' });

  assert.equal(object.get('bar').value, 'baz');
});
