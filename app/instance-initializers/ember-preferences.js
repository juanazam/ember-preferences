import { initializer } from 'ember-preferences/initializer';
import defaultPreferences from '../-ember-preferences-internal';
import preferences from '../preferences';

var merge = Ember.assign || Ember.merge;

export function initialize(application) {
  var defaults = defaultPreferences(),
      userPreferences = preferences();

  initializer(application, merge(defaults, userPreferences));
}

export default {
  name: 'ember-preferences',
  initialize
};
