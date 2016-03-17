import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import SerializableStore from 'ember-preferences/storage/serializable';

var subject,
    actualStorage;

module('Unit | Storage | memory storage', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = SerializableStore.create({ content: actualStorage });
  }
});

test('serializes objects', function(assert) {
  subject.setItem('foo', { bar: 'baz' });

  assert.equal(actualStorage.getItem('foo'), '{"bar":"baz"}');
});

test('does not serialize undefined values', function(assert) {
  subject.setItem('foo', undefined);

  assert.equal(actualStorage.getItem('foo'), undefined);
});

test('does not serialize null values', function(assert) {
  subject.setItem('foo', undefined);

  assert.equal(actualStorage.getItem('foo'), undefined);
});

test('deserializes objects', function(assert) {
  actualStorage.setItem('foo', '{"bar":"baz"}');

  assert.deepEqual(subject.getItem('foo'), { bar: 'baz' });
});

test('does not try to deserialize undefined values', function(assert) {
  assert.deepEqual(subject.getItem('foo'), undefined);
});

test('does not try to deserialize null values', function(assert) {
  actualStorage.setItem('foo', null);

  assert.deepEqual(subject.getItem('foo'), null);
});

test('clears the store', function(assert) {
  subject.setItem('foo', { bar: 'baz' });
  subject.clear();

  assert.equal(subject.getItem('foo'), undefined);
});

test('removes item', function(assert) {
  subject.setItem('foo', 'bar');
  subject.removeItem('foo');

  assert.equal(subject.getItem('foo'), undefined);
});

test('allows to store numbers', function(assert) {
  subject.setItem('foo', 100);

  assert.equal(subject.getItem('foo'), 100);
});

test('allows to store strings', function(assert) {
  subject.setItem('foo', 'baz');
  subject.setItem('bar', '100');

  assert.equal(subject.getItem('foo'), 'baz');
  assert.equal(subject.getItem('bar'), '100');
});
