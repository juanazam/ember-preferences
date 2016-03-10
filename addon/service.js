import Ember from 'ember';
/* global localStorage */

export default Ember.Service.extend({
  unknownProperty(key) {
    return localStorage.getItem(key);
  },

  setUnknownProperty(key, value) {
    localStorage.setItem(key, value);
    this.notifyPropertyChange(key);

    return value;
  }
});
