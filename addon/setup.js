import Service from 'ember-preferences/service';
import MemoryStorage from 'ember-preferences/storage/memory';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';

// FIXME: How can I test this? `window.localStorage = ...` is disabled in most browsers
// See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function isLocalStorageAvailable() {
  var isAvailable;

  try {
    window.localStorage.setItem('ember-preferences-test', true);
    isAvailable = window.localStorage.getItem('ember-preferences-test');
    window.localStorage.removeItem('ember-preferences-test');
  } catch(error) {
    isAvailable = false;
  }

  return isAvailable;
}

function localStorage(namespace) {
  return NamespaceableStorage.create({
    namespace,
    content: SerializableStorage.create({
      content: window.localStorage
    })
  });
}

export function setup(application, preferences) {
  // Configure the service
  var storage = isLocalStorageAvailable() ? localStorage(preferences.namespace) : MemoryStorage.create();

  application.register(
    'service:preferences',
    Service.create({ _storage: storage }),
    { singleton: true, instantiate: false }
  );

  // Inject the service everywhere
  ['route', 'controller', 'component'].forEach(type => {
    application.inject(type, 'preferences', 'service:preferences');
  });
}
