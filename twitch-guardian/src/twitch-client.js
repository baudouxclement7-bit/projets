import { RefreshingAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { attachModerator } from './bot.js';

export async function startTwitchBot({ clientId, clientSecret, tokenData, channels, store }) {
  const authProvider = new RefreshingAuthProvider({ clientId, clientSecret });
  await authProvider.addUserForToken(tokenData, ['chat:read', 'chat:edit']);
  const chatClient = new ChatClient({ authProvider, channels });
  attachModerator(chatClient, store);
  await chatClient.connect();
  return chatClient;
}
