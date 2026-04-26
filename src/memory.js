function toInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBool(value, fallback = true) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "n", "off"].includes(normalized)) {
    return false;
  }
  return fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function truncate(value, limit) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit - 1).trimEnd()}...`;
}

function cleanMessageContent(content, botId) {
  return String(content || "")
    .replace(new RegExp(`<@!?${botId}>`, "g"), "@Chaos")
    .replace(/<@&\d+>/g, "@rola")
    .replace(/<@!?\d+>/g, "@uzytkownik")
    .replace(/<#\d+>/g, "#kanal")
    .replace(/<a?:[a-zA-Z0-9_]+:\d+>/g, "")
    .trim();
}

function getAuthorName(message) {
  return truncate(
    message.member?.displayName ||
      message.author?.globalName ||
      message.author?.username ||
      message.author?.tag ||
      "uzytkownik",
    40,
  );
}

export function readMemoryConfig(env = process.env) {
  return {
    enabled: toBool(env.NPC_MEMORY_ENABLED, true),
    maxMessages: clamp(toInt(env.NPC_MEMORY_MAX_MESSAGES, 80), 5, 250),
    contextMessages: clamp(toInt(env.NPC_MEMORY_CONTEXT_MESSAGES, 18), 0, 80),
    maxContextChars: clamp(toInt(env.NPC_MEMORY_MAX_CHARS, 3500), 500, 12000),
    ttlMinutes: clamp(toInt(env.NPC_MEMORY_TTL_MINUTES, 720), 5, 10080),
    maxSingleMessageChars: clamp(toInt(env.NPC_MEMORY_MAX_SINGLE_MESSAGE_CHARS, 500), 80, 1500),
  };
}

export function createConversationMemory(config) {
  const channelMessages = new Map();

  function prune(key, now) {
    const messages = channelMessages.get(key) || [];
    const minTime = now - config.ttlMinutes * 60 * 1000;
    const fresh = messages
      .filter((item) => item.createdAt >= minTime)
      .slice(-config.maxMessages);

    if (fresh.length > 0) {
      channelMessages.set(key, fresh);
    } else {
      channelMessages.delete(key);
    }

    return fresh;
  }

  function remember(message, botId) {
    if (!config.enabled || !message.guildId || !message.channelId) {
      return;
    }

    const content = cleanMessageContent(message.content, botId);
    const attachmentCount = message.attachments?.size || 0;
    if (!content && attachmentCount === 0) {
      return;
    }

    const key = `${message.guildId}:${message.channelId}`;
    const now = Date.now();
    const messages = prune(key, now);
    messages.push({
      author: getAuthorName(message),
      content: truncate(content || `[zalacznik: ${attachmentCount}]`, config.maxSingleMessageChars),
      createdAt: now,
    });
    channelMessages.set(key, messages.slice(-config.maxMessages));
  }

  function getContext(message) {
    if (!config.enabled || config.contextMessages <= 0 || !message.guildId || !message.channelId) {
      return "";
    }

    const key = `${message.guildId}:${message.channelId}`;
    const messages = prune(key, Date.now()).slice(-config.contextMessages);
    if (messages.length === 0) {
      return "";
    }

    const lines = [];
    for (const item of messages) {
      const line = `${item.author}: ${item.content}`;
      const next = [...lines, line].join("\n");
      if (next.length > config.maxContextChars) {
        break;
      }
      lines.push(line);
    }

    return lines.join("\n");
  }

  return {
    remember,
    getContext,
  };
}
