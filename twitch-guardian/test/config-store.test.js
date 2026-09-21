import test from 'node:test';
import assert from 'node:assert/strict';
import { ChannelConfigStore } from '../src/config-store.js';

test('creates independent default rules for each authorised channel', () => {
  const store = new ChannelConfigStore();
  store.authorise('alice');
  store.authorise('bob');
  store.update('alice', { blockedTerms: ['spoiler'], blockLinks: false });

  assert.deepEqual(store.get('alice'), {
    blockedTerms: ['spoiler'], blockLinks: false, exemptUsers: ['alice'], timeoutSeconds: 300
  });
  assert.deepEqual(store.get('bob'), {
    blockedTerms: [], blockLinks: true, exemptUsers: ['bob'], timeoutSeconds: 300
  });
});

test('refuses rule changes for a channel that is not authorised', () => {
  const store = new ChannelConfigStore();
  assert.throws(() => store.update('unknown', { blockLinks: false }), /not authorised/);
});
