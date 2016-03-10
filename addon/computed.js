import Ember from 'ember';

export default function preference(dependentKey, options = {}) {
  var key = `preferences.${dependentKey}`;

  return Ember.computed(key, {
    get() {
      var value = this.get(key);

      if (typeof value === 'undefined' || value === null) {
        if (typeof options.defaultValue === 'function') {
          return options.defaultValue();
        } else {
          return options.defaultValue;
        }
      }

      return value;
    },

    set(_, value) {
      return this.set(key, value);
    }
  });
}
