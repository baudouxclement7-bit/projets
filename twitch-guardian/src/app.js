import express from 'express';
import { decideModeration } from './moderation.js';

export function createApp(store) {
  const app = express();
  app.use(express.json());
  app.use(express.static(new URL('../public', import.meta.url).pathname));

  app.get('/health', (_request, response) => response.json({ ok: true }));
  app.get('/api/channels', (_request, response) => response.json(store.list()));

  app.post('/api/channels/:channel/rules', (request, response) => {
    try {
      const config = store.update(request.params.channel, request.body);
      response.json(config);
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
  });

  app.post('/api/preview', (request, response) => {
    const config = store.get(request.body.channel);
    if (!config) return response.status(404).json({ error: 'Channel not authorised' });
    return response.json(decideModeration({ text: request.body.text ?? '', user: request.body.user ?? '' }, config));
  });

  return app;
}
