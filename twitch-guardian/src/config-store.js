const DEFAULT_TIMEOUT_SECONDS = 300;

function normalizeChannel(channel) {
  return channel.trim().toLowerCase().replace(/^#/, '');
}

export class ChannelConfigStore {
  #channels = new Map();

  authorise(channel) {
    const key = normalizeChannel(channel);
    if (!this.#channels.has(key)) {
      this.#channels.set(key, {
        blockedTerms: [],
        blockLinks: true,
        exemptUsers: [key],
        timeoutSeconds: DEFAULT_TIMEOUT_SECONDS
      });
    }
    return this.get(key);
  }

  get(channel) {
    const config = this.#channels.get(normalizeChannel(channel));
    return config ? structuredClone(config) : undefined;
  }

  update(channel, changes) {
    const key = normalizeChannel(channel);
    const current = this.#channels.get(key);
    if (!current) throw new Error(`Channel ${key} is not authorised`);
    const next = { ...current, ...changes, exemptUsers: changes.exemptUsers ?? current.exemptUsers };
    this.#channels.set(key, next);
    return this.get(key);
  }

  list() {
    return [...this.#channels.entries()].map(([channel, config]) => ({ channel, ...structuredClone(config) }));
  }
}
