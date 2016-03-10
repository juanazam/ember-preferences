export function initialize(application) {
  ['route', 'controller', 'component'].forEach(type => {
    application.inject(type, 'preferences', 'service:preferences');
  });
}

export default {
  name: 'inject-preferences',
  initialize
};
