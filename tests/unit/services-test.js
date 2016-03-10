import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
/* global localStorage */

var { computed } = Ember;

moduleFor('service:preferences', 'Unit | Service | preferences', {
  beforeEach() {
    localStorage.clear();
  }
});

test('store preference in local storage', function(assert) {
  let service = this.subject();
  service.set('foo', 'bar');

  assert.equal(localStorage.getItem('foo'), 'bar');
});

test('fetch preference from local storage', function(assert) {
  let service = this.subject();
  localStorage.setItem('baz', 'qux');

  assert.equal(service.get('baz'), 'qux');
});

test('notifies when a property changes', function(assert) {
  let service = this.subject();
  let object = Ember.Object.create({
    preferences: service,
    bar: computed.alias('preferences.foo')
  });

  assert.equal(object.get('bar'), null);

  service.set('foo', 'baz');

  assert.equal(object.get('bar'), 'baz');
});
