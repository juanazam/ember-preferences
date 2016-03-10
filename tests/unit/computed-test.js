import Ember from 'ember';
import computed from 'ember-preferences/computed';
import { module, test } from 'qunit';

module('Unit | Utility | computed');

function createInstance(options = {}) {
  let Class = Ember.Object.extend({
    foo: computed('foo', options.cpOptions)
  });

  let preferences = options.preferences || { foo: 'bar' };

  let instance = Class.create({ preferences });

  return instance;
}

test('returns values from "preference" property', function(assert) {
  let instance = createInstance();

  assert.equal(instance.get('foo'), 'bar');
});

test('updates value when the preference changes', function(assert) {
  let instance = createInstance();

  assert.equal(instance.get('foo'), 'bar');

  instance.set('preferences.foo', 'baz');

  assert.equal(instance.get('foo'), 'baz');
});

test('returns default value when preference is null', function(assert) {
  let instance = createInstance({
    cpOptions: {
      defaultValue: 'qux'
    },

    preferences: { foo: null }
  });

  assert.equal(instance.get('foo'), 'qux');
});

test('returns default value when preference is undefined', function(assert) {
  let instance = createInstance({
    cpOptions: {
      defaultValue: 'qux'
    },

    preferences: { }
  });

  assert.equal(instance.get('foo'), 'qux');
});

test('evaluates default value when it is a function', function(assert) {
  let instance = createInstance({
    cpOptions: {
      defaultValue() {
        return 'qux';
      }
    },

    preferences: { }
  });

  assert.equal(instance.get('foo'), 'qux');
});

test('writes configuration to preference object', function(assert) {
  let instance = createInstance();

  instance.set('foo', 'baz');

  assert.equal(instance.get('preferences.foo'), 'baz');
});

test('updates value when the property changes', function(assert) {
  let instance = createInstance();

  assert.equal(instance.get('foo'), 'bar');

  instance.set('foo', 'baz');

  assert.equal(instance.get('foo'), 'baz');
});
