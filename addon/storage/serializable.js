import Ember from 'ember';

export default Ember.Object.extend({
  content: null,

  setItem(key, value) {
    return this.get('content').setItem(key, JSON.stringify(value));
  },

  getItem(key) {
    var value = this.get('content').getItem(key);

    if (typeof value === 'undefined' || value === null) {
      return value;
    }

    return JSON.parse(value);
  },

  clear() {
    this.get('content').clear();
  },

  removeItem(key) {
    this.get('content').removeItem(key);
  }
});
