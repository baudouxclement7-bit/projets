import { createApp } from './app.js';
import { ChannelConfigStore } from './config-store.js';
import { startTwitchBot } from './twitch-client.js';

const store = new ChannelConfigStore();
const channels = (process.env.AUTHORIZED_CHANNELS ?? '').split(',').map((value) => value.trim()).filter(Boolean);
for (const channel of channels) store.authorise(channel);

const port = Number(process.env.PORT ?? 3400);
createApp(store).listen(port, '127.0.0.1', () => {
  console.log(`Twitch Guardian dashboard: http://127.0.0.1:${port}`);
});

if (process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET && process.env.TWITCH_TOKEN_DATA && channels.length) {
  startTwitchBot({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    tokenData: JSON.parse(process.env.TWITCH_TOKEN_DATA),
    channels,
    store
  }).then(() => console.log(`Twitch bot connected to: ${channels.join(', ')}`))
    .catch((error) => console.error('Twitch bot could not connect:', error.message));
} else {
  console.log('Twitch bot disabled: configure .env to connect it.');
}
