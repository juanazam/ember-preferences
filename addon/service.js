/**
 * @module ember-preferences
 */

/* global localStorage */
import Ember from 'ember';

/**
 * Ember service which reads and writes configurations directly to local
 * storage.
 *
 * Note that in the future you will be able to choose the backend (local
 * storage, session storage, cookies, etc.).
 *
 * @class Service
 * @public
 *
 * @example
 *
 *   import Ember from 'ember';
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: computed.alias('preferences.foo')
 *   });
 *
 * @example <caption>Injecting the service with a different property name</caption>
 *
 *   import Ember from 'ember';
 *   const { inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     userOptions: inject.service('preferences'),
 *     foo: computed.alias('userOptions.foo')
 *   });
 */
export default Ember.Service.extend({
  _storage: null,

  unknownProperty(key) {
    let item = this.storage().getItem(key);

    if (item !== null && typeof item !== 'undefined') {
      return item;
    }
  },

  setUnknownProperty(key, record) {
    this.storage().setItem(key, record);
    this.notifyPropertyChange(key);

    return record.value;
  },

  /**
   * @private
   */
  storage() {
    return this.get('_storage');
  }
});
