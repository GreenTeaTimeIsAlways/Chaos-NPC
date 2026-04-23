import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { buildNpcReply } from "./npc.js";

function requireEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function toInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function splitCsv(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const token = requireEnv("DISCORD_BOT_TOKEN");
const timezone = String(process.env.NPC_TIMEZONE || "Europe/Warsaw").trim();
const cooldownSeconds = Math.max(0, toInt(process.env.NPC_COOLDOWN_SECONDS, 5));
const replyChance = Math.max(1, Math.min(100, toInt(process.env.NPC_REPLY_CHANCE, 100)));
const allowedChannelIds = new Set(splitCsv(process.env.NPC_ALLOWED_CHANNEL_IDS));
const debugLogs = String(process.env.NPC_DEBUG || "true").trim().toLowerCase() !== "false";
const cooldowns = new Map();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

function isAllowedChannel(channelId) {
  return allowedChannelIds.size === 0 || allowedChannelIds.has(channelId);
}

function isCoolingDown(message) {
  if (cooldownSeconds <= 0) {
    return false;
  }

  const key = `${message.guildId}:${message.channelId}:${message.author.id}`;
  const now = Date.now();
  const until = cooldowns.get(key) || 0;
  if (until > now) {
    return true;
  }

  cooldowns.set(key, now + cooldownSeconds * 1000);
  return false;
}

function debug(message) {
  if (debugLogs) {
    console.log(message);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Chaos NPC online jako ${readyClient.user.tag}`);
  console.log(`Timezone: ${timezone}`);
  console.log(
    allowedChannelIds.size > 0
      ? `Allowed channels: ${Array.from(allowedChannelIds).join(", ")}`
      : "Allowed channels: wszystkie",
  );
  console.log(`Debug logs: ${debugLogs ? "on" : "off"}`);
});

client.on(Events.MessageCreate, async (message) => {
  try {
    if (!message.guild || message.author.bot || !client.user) {
      return;
    }

    debug(
      `MessageCreate guild=${message.guildId} channel=${message.channelId} author=${message.author.tag} content="${message.content || "[empty]"}" mentions=${Array.from(message.mentions.users.keys()).join(",") || "[none]"}`,
    );

    if (!isAllowedChannel(message.channelId)) {
      debug(`Ignored: channel ${message.channelId} is not in NPC_ALLOWED_CHANNEL_IDS.`);
      return;
    }

    if (!message.mentions.users.has(client.user.id)) {
      debug(`Ignored: message does not mention bot id ${client.user.id}.`);
      return;
    }

    if (Math.floor(Math.random() * 100) + 1 > replyChance) {
      debug("Ignored: reply chance roll skipped this message.");
      return;
    }

    if (isCoolingDown(message)) {
      debug("Ignored: cooldown active for this user/channel.");
      return;
    }

    await message.channel.sendTyping();
    await sleep(350 + Math.floor(Math.random() * 700));

    const content = buildNpcReply({
      content: message.content,
      botId: client.user.id,
      guildId: message.guildId,
      timeZone: timezone,
      messageId: message.id,
    });

    await message.reply({
      content,
      allowedMentions: {
        parse: [],
        repliedUser: false,
      },
    });
    debug("Replied successfully.");
  } catch (error) {
    console.error("Blad obslugi wiadomosci:", error);
  }
});

client.on(Events.Error, (error) => {
  console.error("Discord client error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down.");
  client.destroy();
  process.exit(0);
});

await client.login(token);
