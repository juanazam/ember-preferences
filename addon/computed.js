/**
 * @module ember-preferences
 */

import Ember from 'ember';

function isExpired(record, options) {
  if (typeof record.expiresAt) {
    return record.expiresAt < new Date();
  } else {
    return false;
  }
}

function calculateValue(target, record, options) {
  if (typeof record.value === 'undefined' || record.value === null || isExpired(record, options)) {
    if (typeof options.defaultValue === 'function') {
      return options.defaultValue.call(target);
    } else {
      return options.defaultValue;
    }
  }

  return record.value;
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
 * @param {Function} options.expires - Function which determines when the record will expire
 * @return {Ember.ComputedProperty}
 */
export default function preference(dependentKey, options = {}) {
  var key = `preferences.${dependentKey}`;

  return Ember.computed(key, {
    get() {
      let record = this.get(key) || {};

      if (record) {
        return calculateValue(this, record, options);
      }
    },

    set(_, value) {
      let record = { value };

      if (options.expires !== null && typeof options.expires !== 'undefined') {
        record.expiresAt = options.expires();
      }

      this.set(key, record);

      return calculateValue(this, record, options);
    }
  });
}
