# Ember Preferences

Easy way of managing user preference on the client side with local storage (and other providers in the future)

## Installation

```
$ ember install ember-preferences
```

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md).

## Synopsis

```js
import Ember from 'ember';
import preference from 'ember-preference';

export default Ember.Component.extend({
  isVisible: preference('isVisible', { defaultValue: true }),

  actions: {
    onHide() {
      this.set('isVisible', false);
    }
  }
});
```

Every time `isVisible` is changed, the changes are stored in local storage. If you reload the page, the value is retrieved from local storage on `get`.

## Development

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

## License

ember-preferences is licensed under the MIT license.

See [LICENSE](./LICENSE.md) for the full license text.
