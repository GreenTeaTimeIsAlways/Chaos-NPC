# Chaos NPC Bot

Osobny bot Discord, ktory odpowiada, gdy ktos oznaczy go na serwerze.
Nie uzywa Gemini, OpenAI ani zadnego zewnetrznego AI. Wszystko generuje lokalnie z pul slow.

## Jak dziala

Przyklad:

```txt
@Chaos NPC kim jestes?
```

Bot odpowie jako NPC dnia. Na danym serwerze postac jest stabilna przez jeden dzien, a kolejnego dnia zmienia sie automatycznie.

Przyklady:

```txt
@Chaos NPC kim jestes?
@Chaos NPC daj quest
@Chaos NPC daj znak
@Chaos NPC wybierz pizza czy kebab
@Chaos NPC czy powinienem kliknac trzeci przycisk?
```

## Zmienne Railway

W Railway dodaj:

```txt
DISCORD_BOT_TOKEN=token_nowego_bota
NPC_TIMEZONE=Europe/Warsaw
NPC_COOLDOWN_SECONDS=5
NPC_ALLOWED_CHANNEL_IDS=
NPC_REPLY_CHANCE=100
```

Opis:

- `DISCORD_BOT_TOKEN` - token nowego bota z Discord Developer Portal.
- `NPC_TIMEZONE` - strefa czasowa do NPC dnia.
- `NPC_COOLDOWN_SECONDS` - antyspam na osobe w kanale.
- `NPC_ALLOWED_CHANNEL_IDS` - opcjonalna lista ID kanalow po przecinku. Puste = bot odpowiada wszedzie, gdzie ma dostep.
- `NPC_REPLY_CHANCE` - procent odpowiedzi po oznaczeniu. `100` = zawsze odpowiada.

## Uruchomienie lokalne

```bash
npm install
npm start
```

Do lokalnego testu utworz plik `.env`, ale nie wrzucaj go na GitHuba.

## Railway

Railway sam wykryje Node.js i uruchomi:

```bash
npm start
```

Bot musi miec wlaczony `Message Content Intent` w Discord Developer Portal, bo odpowiada na zwykle wiadomosci z oznaczeniem.

