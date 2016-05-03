import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
/* global localStorage */

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    localStorage.clear();
  },

  afterEach() {
    delete window.preferenceFixture;
  }
});

test('reads and writes to local storage, even complex values', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('h1').text(), 'Hello World!');
  });

  click('.simple-value');

  andThen(function() {
    assert.equal(localStorage.getItem('dummy:title'), '"Hey Hey! Bye bye"');
  });

  click('.complex-value');

  andThen(function() {
    assert.equal(find('h2').text(), 'Complex value!');
  });
});

test('configures namespace', function(assert) {
  window.preferenceFixture = {
    namespace: 'foo'
  };

  visit('/');
  click('.simple-value');

  andThen(function() {
    assert.equal(localStorage.getItem('foo:title'), '"Hey Hey! Bye bye"');
  });
});
