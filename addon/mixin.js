import Ember from 'ember';

var { inject } = Ember;

export default Ember.Mixin.create({
  preferences: inject.service()
});
