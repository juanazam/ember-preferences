import { inject } from 'ember-preferences/setup';

function initialize(application) {
  var registry;

  // FIXME: We test the application to know if we're using ember 1.12, 1.13 or +2.0
  if (application.inject) {
    registry = application;
  } else if (application.registry && application.registry.injection) {
    registry = application.registry;
  } else if (application.container && application.container.injection) {
    registry = application.container;
  } else {
    registry = application;
  }

  inject(registry);
}

export default {
  name: 'ember-preferences',
  initialize
};
