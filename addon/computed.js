import Ember from 'ember';

export default function preference(dependentKey, options = {}) {
  var key = `preferences.${dependentKey}`;

  function calculateValue(value) {
    if (typeof value === 'undefined' || value === null) {
      if (typeof options.defaultValue === 'function') {
        return options.defaultValue();
      } else {
        return options.defaultValue;
      }
    }

    return value;
  }

  return Ember.computed(key, {
    get() {
      var value = this.get(key);

      return calculateValue(value);
    },

    set(_, value) {
      this.set(key, value);

      return calculateValue(value);
    }
  });
}
