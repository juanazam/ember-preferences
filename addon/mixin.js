/**
 * @module ember-preferences
 */

import Ember from 'ember';

var { inject } = Ember;

/**
 * Mixin to inject the preferences service on other injectable objects, this
 * DRYs up and gives consistency to the code.
 *
 * @class Mixin
 * @public
 *
 * @example
 *
 *   import Ember from 'ember';
 *   import PreferencesMixin from 'ember-preferences/mixin';
 *
 *   export default Ember.Component.extend(PreferencesMixin, {
 *     foo: Ember.computed.alias('preferences.foo')
 *   });
 */
export default Ember.Mixin.create({
  /**
   * @property preferences
   * @type {Ember.Service}
   * @public
   */
  preferences: inject.service()
});
