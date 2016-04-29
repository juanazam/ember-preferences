import { module, test } from 'qunit';
import SerializableStore from 'ember-preferences/storage/serializable';
/* global localStorage */

var subject;

module('Unit | Storage | serializable storage', {
  beforeEach() {
    localStorage.clear();
    subject = SerializableStore.create({ content: localStorage });
  }
});

test('serializes objects', function(assert) {
  subject.setItem('foo', { value: { bar: 'baz' } });

  assert.deepEqual(JSON.parse(localStorage.getItem('foo')).value, { bar: 'baz' });
});

test('does not serialize undefined values', function(assert) {
  subject.setItem('foo', { value: undefined });

  assert.equal(localStorage.getItem('foo'), undefined);
});

test('does not serialize null values', function(assert) {
  subject.setItem('foo', { value: null });

  assert.equal(localStorage.getItem('foo'), undefined);
});

test('deserializes objects', function(assert) {
  localStorage.setItem('foo', '{"value": {"bar":"baz"} }');

  assert.deepEqual(subject.getItem('foo').value, { bar: 'baz' });
});

test('does not try to deserialize undefined values', function(assert) {
  assert.deepEqual(subject.getItem('foo'), null);
});

test('does not try to deserialize null values', function(assert) {
  localStorage.setItem('foo', null);

  assert.deepEqual(subject.getItem('foo'), null);
});

test('clears the store', function(assert) {
  subject.setItem('foo', { value: { bar: 'baz' } });
  subject.clear();

  assert.equal(subject.getItem('foo'), undefined);
});

test('removes item', function(assert) {
  subject.setItem('foo', { value: 'bar' });
  subject.removeItem('foo');

  assert.equal(subject.getItem('foo'), undefined);
});

test('allows to store numbers', function(assert) {
  subject.setItem('foo', { value: 100 });

  assert.equal(subject.getItem('foo').value, 100);
});

test('allows to store strings', function(assert) {
  subject.setItem('foo', { value: 'baz' });
  subject.setItem('bar', { value: '100' });

  assert.equal(subject.getItem('foo').value, 'baz');
  assert.equal(subject.getItem('bar').value, '100');
});
