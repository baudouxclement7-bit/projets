import { decideModeration } from './moderation.js';

export function attachModerator(chatClient, store, log = console) {
  chatClient.onMessage(async (channel, user, text) => {
    const config = store.get(channel);
    if (!config) return;
    const decision = decideModeration({ text, user }, config);
    if (decision.action !== 'timeout') return;

    await chatClient.say(channel, `/timeout ${user} ${decision.duration} ${decision.reason}`);
    log.info(`Timeout ${channel} ${user}: ${decision.reason}`);
  });
}
