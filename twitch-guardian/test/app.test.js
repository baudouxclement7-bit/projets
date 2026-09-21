import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { ChannelConfigStore } from '../src/config-store.js';

test('exposes a health endpoint and only lists authorised channels', async (t) => {
  const store = new ChannelConfigStore();
  store.authorise('alice');
  const app = createApp(store);
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
  });
  t.after(() => server.close());
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const health = await fetch(`${baseUrl}/health`);
  assert.deepEqual(await health.json(), { ok: true });

  const channels = await fetch(`${baseUrl}/api/channels`);
  assert.deepEqual(await channels.json(), [{
    channel: 'alice', blockedTerms: [], blockLinks: true, exemptUsers: ['alice'], timeoutSeconds: 300
  }]);
});
