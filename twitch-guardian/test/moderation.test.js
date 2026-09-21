import test from 'node:test';
import assert from 'node:assert/strict';
import { decideModeration } from '../src/moderation.js';

const config = {
  blockedTerms: ['insulte'],
  blockLinks: true,
  exemptUsers: ['streamer'],
  timeoutSeconds: 300
};

test('blocks a configured term regardless of case', () => {
  assert.deepEqual(decideModeration({ text: 'Quelle INSULTE', user: 'viewer' }, config), {
    action: 'timeout', reason: 'blocked_term', duration: 300
  });
});

test('blocks links for non-exempt viewers', () => {
  assert.deepEqual(decideModeration({ text: 'viens sur https://spam.example', user: 'viewer' }, config), {
    action: 'timeout', reason: 'link', duration: 300
  });
});

test('does not moderate the streamer account', () => {
  assert.deepEqual(decideModeration({ text: 'https://legit.example', user: 'streamer' }, config), {
    action: 'allow'
  });
});

test('allows ordinary messages', () => {
  assert.deepEqual(decideModeration({ text: 'Bonjour tout le monde', user: 'viewer' }, config), {
    action: 'allow'
  });
});
