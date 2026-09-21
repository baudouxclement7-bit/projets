import test from 'node:test';
import assert from 'node:assert/strict';
import { ChannelConfigStore } from '../src/config-store.js';
import { attachModerator } from '../src/bot.js';

test('times out a viewer when a channel rule matches', async () => {
  const store = new ChannelConfigStore();
  store.authorise('alice');
  store.update('alice', { blockedTerms: ['spam'] });
  const fakeChat = { onMessage(handler) { this.handler = handler; }, sayCalls: [], async say(...args) { this.sayCalls.push(args); } };
  attachModerator(fakeChat, store);

  await fakeChat.handler('#alice', 'viewer', 'SPAM now');
  assert.deepEqual(fakeChat.sayCalls, [['#alice', '/timeout viewer 300 blocked_term']]);
});

test('does not issue a chat command for an allowed message', async () => {
  const store = new ChannelConfigStore();
  store.authorise('alice');
  const fakeChat = { onMessage(handler) { this.handler = handler; }, sayCalls: [], async say(...args) { this.sayCalls.push(args); } };
  attachModerator(fakeChat, store);

  await fakeChat.handler('#alice', 'viewer', 'bonjour');
  assert.deepEqual(fakeChat.sayCalls, []);
});
