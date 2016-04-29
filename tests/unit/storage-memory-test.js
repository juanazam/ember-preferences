import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';

var subject;

module('Unit | Storage | memory storage', {
  beforeEach() {
    subject = MemoryStorage.create();
  }
});

test('stores and retrieves a value', function(assert) {
  subject.setItem('foo', { value: 'bar' });

  assert.equal(subject.getItem('foo').value, 'bar');
});

test('clears the store', function(assert) {
  subject.setItem('foo', { value: 'bar' });
  subject.clear();

  assert.equal(subject.getItem('foo'), undefined);
});

test('removes item', function(assert) {
  subject.setItem('foo', { value: 'bar' });
  subject.removeItem('foo');

  assert.equal(subject.getItem('foo'), undefined);
});
