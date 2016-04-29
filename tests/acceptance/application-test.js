import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
/* global localStorage */

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    localStorage.clear();
  }
});

test('reads and writes to local storage, even complex values', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('h1').text(), 'Hello World!');
  });

  click('.simple-value');

  andThen(function() {
    assert.equal(JSON.parse(localStorage.getItem('title')).value, 'Hey Hey! Bye bye');
  });

  click('.complex-value');

  andThen(function() {
    assert.equal(find('h2').text(), 'Complex value!');
  });
});
