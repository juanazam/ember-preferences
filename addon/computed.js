import Ember from 'ember';

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

export default function preference(dependentKey, options = {}) {
  var key = `preferences.${dependentKey}`;

  return Ember.computed(key, {
    get() {
      var value = this.get(key);

      return calculateValue(this, value, options);
    },

    set(_, value) {
      this.set(key, value);

      return calculateValue(this, value, options);
    }
  });
}
