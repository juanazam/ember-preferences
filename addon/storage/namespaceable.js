import Ember from 'ember';
import DecoratorMixin from 'ember-preferences/storage/decorator';

var { camelize } = Ember.String;

export default Ember.Object.extend(DecoratorMixin, {
  namespace: null,

  setItem(key, value) {
    return this._super(this.fullQualifiedKey(key), value);
  },

  getItem(key) {
    return this._super(this.fullQualifiedKey(key));
  },

  removeItem(key) {
    return this._super(this.fullQualifiedKey(key));
  },

  /**
   * @private
   */
  fullQualifiedKey(key) {
    var namespace = this.get('namespace');
    var fqk;

    if (typeof namespace !== 'undefined' && namespace !== null) {
      fqk = camelize(`${this.get('namespace')} ${key}`);
    } else {
      fqk = key;
    }

    return fqk;
  }
});
