import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
/* global localStorage */

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    localStorage.clear();
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('h1').text(), 'Hello World!');
  });

  click('button');

  andThen(function() {
    assert.equal(localStorage.getItem('title'), 'Hey Hey! Bye bye');
  });
});
