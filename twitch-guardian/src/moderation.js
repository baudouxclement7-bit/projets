const LINK_PATTERN = /(?:https?:\/\/|www\.)\S+/i;

export function decideModeration({ text, user }, config) {
  const normalizedUser = user.toLowerCase();
  if ((config.exemptUsers ?? []).map((name) => name.toLowerCase()).includes(normalizedUser)) {
    return { action: 'allow' };
  }

  const normalizedText = text.toLowerCase();
  if ((config.blockedTerms ?? []).some((term) => normalizedText.includes(term.toLowerCase()))) {
    return { action: 'timeout', reason: 'blocked_term', duration: config.timeoutSeconds };
  }

  if (config.blockLinks && LINK_PATTERN.test(text)) {
    return { action: 'timeout', reason: 'link', duration: config.timeoutSeconds };
  }

  return { action: 'allow' };
}
