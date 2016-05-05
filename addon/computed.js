/**
 * @module ember-preferences
 */

import Ember from 'ember';
import { expirable } from 'ember-preferences/storage/expirable';

function calculateValue(target, value, options) {
  if (typeof value === 'undefined' || value === null) {
    if (typeof options.defaultValue === 'function') {
      return options.defaultValue.call(target);
    } else {
      return options.defaultValue;
    }
  }

  return value;
}

/**
 * Computed property which extends the capabilities of a preference key by
 * adding the possibility of returning a default value.
 *
 * When the computed property is set the value is automatically stored in the
 * preference store.
 *
 * When `null` or `undefined` is set the computed property returns its default
 * value.
 *
 * @public
 *
 * @example
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar')
 *   });
 *
 * @example <caption>With default values</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar', { defaultValue: 'hello world!' })
 *   });
 *
 * @example <caption>With a function as default value</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar', { defaultValue() { return ['an', 'array']; } })
 *   });
 *
 * @param {String} dependentKey - Key from preferences to subscribe to
 * @param {Object} options - Additional options
 * @param {Function|Any} options.defaultValue - Default value to return when the preference value is null or undefined
 * @return {Ember.ComputedProperty}
 */
export default function preference(dependentKey, options = {}) {
  var key = `preferences.${dependentKey}`;

  return Ember.computed(key, {
    get() {
      var value = this.get(key);

      return calculateValue(this, value, options);
    },

    set(_, value) {
      if (typeof options.expires === 'function') {
        value = expirable(options.expires(), value);
      }

      this.set(key, value);

      return calculateValue(this, value, options);
    }
  });
}
