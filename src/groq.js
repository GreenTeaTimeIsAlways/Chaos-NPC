import { buildNpcPersona, stripBotMention } from "./npc.js";

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.1-8b-instant";

let quotaDayKey = "";
let quotaUsed = 0;

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

function getDayKey(timeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

function resetQuotaIfNeeded(timeZone) {
  const dayKey = getDayKey(timeZone || "Europe/Warsaw");
  if (quotaDayKey !== dayKey) {
    quotaDayKey = dayKey;
    quotaUsed = 0;
  }
}

function reserveDailyRequest(config, timeZone) {
  resetQuotaIfNeeded(timeZone);

  if (config.dailyLimit <= 0) {
    return { ok: false, reason: "ai_daily_limit_disabled" };
  }

  if (quotaUsed >= config.dailyLimit) {
    return { ok: false, reason: "ai_daily_limit_reached" };
  }

  quotaUsed += 1;
  return { ok: true, used: quotaUsed, limit: config.dailyLimit };
}

function parseTemperature(value) {
  const parsed = Number.parseFloat(String(value || ""));
  if (!Number.isFinite(parsed)) {
    return 0.95;
  }
  return clamp(parsed, 0, 2);
}

function cleanDiscordOutput(value) {
  return String(value || "")
    .replace(/<@!?\d+>/g, "")
    .replace(/<@&\d+>/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 1800);
}

function buildSystemPrompt(personaText) {
  return [
    "Jestes Chaos NPC na serwerze Discord Randomness.",
    "Odpowiadasz po polsku, jak dziwna, ale komunikatywna postac NPC.",
    "Masz byc surrealistyczny, ironiczny i troche niepokojaco logiczny, ale nie bezuzytecznie losowy.",
    "Nie powtarzaj stale tej samej frazy. Reaguj na sens wiadomosci uzytkownika.",
    "Nie pinguj nikogo, nie udawaj administratora, nie obiecuj realnych nagrod.",
    "Nie pisz dlugich esejow. Daj 1-4 krotkie zdania, maksymalnie okolo 600 znakow.",
    "Jesli uzytkownik prosi o wybor, wybierz jedna opcje i podaj krotki absurdalny powod.",
    "Jesli uzytkownik zadaje pytanie, odpowiedz konkretnie, ale w stylu Chaos NPC.",
    "Jesli wiadomosc jest obrazliwa albo bardzo chaotyczna, odpowiedz lagodnie i obroc to w klimat serwera.",
    "",
    "Twoja persona dzisiaj:",
    personaText,
  ].join("\n");
}

function buildFallbackResult(fallbackReply, reason) {
  return {
    content: fallbackReply(),
    source: "local",
    reason,
  };
}

export function readAiConfig(env = process.env) {
  const groqApiKey = String(env.GROQ_API_KEY || "").trim();
  const provider = String(env.NPC_AI_PROVIDER || (groqApiKey ? "groq" : "local"))
    .trim()
    .toLowerCase();

  return {
    enabled: provider === "groq",
    provider,
    groqApiKey,
    model: String(env.NPC_AI_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL,
    dailyLimit: Math.max(0, toInt(env.NPC_AI_DAILY_LIMIT, 100)),
    timeoutMs: clamp(toInt(env.NPC_AI_TIMEOUT_MS, 8000), 1000, 20000),
    maxTokens: clamp(toInt(env.NPC_AI_MAX_TOKENS, 220), 40, 800),
    temperature: parseTemperature(env.NPC_AI_TEMPERATURE),
    fallbackLocal: toBool(env.NPC_AI_FALLBACK_LOCAL, true),
  };
}

export function getAiRuntimeStatus(config, timeZone) {
  resetQuotaIfNeeded(timeZone);
  return {
    provider: config.enabled ? "groq" : "local",
    model: config.model,
    dailyLimit: config.dailyLimit,
    usedToday: quotaUsed,
  };
}

export async function buildGroqNpcReply({
  config,
  content,
  botId,
  guildId,
  timeZone,
  messageId,
  fallbackReply,
}) {
  if (!config.enabled) {
    return buildFallbackResult(fallbackReply, "ai_disabled");
  }

  if (!config.groqApiKey) {
    return buildFallbackResult(fallbackReply, "missing_groq_api_key");
  }

  const prompt = stripBotMention(content, botId);
  if (!prompt) {
    return buildFallbackResult(fallbackReply, "empty_prompt");
  }

  const quota = reserveDailyRequest(config, timeZone);
  if (!quota.ok) {
    return buildFallbackResult(fallbackReply, quota.reason);
  }

  const { text: personaText } = buildNpcPersona({ guildId, timeZone, messageId });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.groqApiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(personaText),
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`Groq API ${response.status}: ${responseText.slice(0, 400)}`);
    }

    const data = JSON.parse(responseText);
    const answer = cleanDiscordOutput(data?.choices?.[0]?.message?.content);
    if (!answer) {
      throw new Error("Groq zwrocil pusta odpowiedz.");
    }

    return {
      content: answer,
      source: "groq",
      usedToday: quota.used,
      dailyLimit: quota.limit,
    };
  } catch (error) {
    console.error("Groq reply failed:", error);
    if (config.fallbackLocal) {
      return buildFallbackResult(fallbackReply, "groq_error");
    }
    return {
      content: "Chaos NPC zgubil polaczenie z wyrocznia. Sprobuj za chwile.",
      source: "error",
      reason: "groq_error",
    };
  } finally {
    clearTimeout(timeout);
  }
}
