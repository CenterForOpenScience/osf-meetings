import { moduleForModel, test } from 'ember-qunit';

moduleForModel('conference', 'Unit | Model | conference', {
  // Specify the other units that are required for this test.
  integration: true
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
