const NAMES = [
  "Bazyli", "Mira", "Teodor", "Luna", "Klemens", "Ruta", "Oskar", "Nela", "Bruno", "Iga",
  "Fryderyk", "Tola", "Radomir", "Kira", "Marcel", "Nora", "Zenon", "Ida", "Edek", "Gaja",
  "Natan", "Polka", "Sylas", "Mika", "Roland", "Figa", "Tymon", "Lilka", "Benedykt", "Sonia",
];

const NICKNAMES = [
  "Trzecia Opcja", "Od Niedokonczonych Map", "Kustosz Przypadku", "Wladca Bocznicy",
  "Ostatni Parasol", "Cichy Debugger", "Kartograf Ciszy", "Szept Poniedzialku",
  "Poborca Westchnien", "Dyrektor Szuflady", "Zegarmistrz Bez Zegara", "Kurier Snow",
  "Kolekcjoner Znakow", "Kapitan Windy", "Mistrz Niepewnosci", "Prorok Pustego Kubka",
  "Sekretarz Glitcha", "Ambasador Dziwnych Decyzji", "Straznik Drugiej Mysli",
  "Architekt Przypadkowych Drzwi",
];

const JOBS = [
  "kontroler bocznych questow", "sprzedawca map do miejsc, ktore nie istnieja",
  "archiwista pomylek", "doradca od niepotrzebnych rytualow", "inspektor cieni",
  "opiekun zgubionych argumentow", "technik od nastroju serwera", "certyfikowany losolog",
  "kustosz muzeum bledow", "kurator podejrzanych przedmiotow", "tester przepowiedni",
  "moderator rozmow z krzeslami", "broker wymowek", "pilot windy miedzy watkami",
  "rzecznik chaosu niskiego ryzyka", "konserwator dziwnych znakow",
  "audytor przypadkowych skojarzen", "operator alarmu bez alarmu",
  "bibliotekarz nieuzytych odpowiedzi", "specjalista od rzeczy prawie normalnych",
];

const PLACES = [
  "poczekalnia snow", "serwerownia przeznaczenia", "muzeum bledow", "bar na granicy sensu",
  "parking dla mysli", "hotel zgubionych odpowiedzi", "stacja koncowa internetu",
  "ogrod z zakazem logiki", "tunel pod kalendarzem", "sala obrad przypadkow",
  "korytarz bocznych questow", "rynek wymiany wymowek", "laboratorium pomylek",
  "archiwum rzeczy niedopowiedzianych", "most miedzy dwoma zlymi wyborami",
  "centrum dowodzenia cisza", "planetarium z jedna gwiazda za duzo",
  "komisariat niewyjasnionych zbiegow okolicznosci", "wyspa trzecich opcji",
  "biblioteka pustych tytulow",
];

const SECRETS = [
  "udaje, ze nie zna hasla do wlasnej walizki", "ma w kieszeni paragon z jutra",
  "rozumie jezyk parasoli, ale sie tego wstydzi", "wie, kto ukradl kolor niebieski",
  "nigdy nie mruga, gdy ktos mowi 'normalnie'", "przechowuje drugi koniec watku",
  "zna trzy zakazane definicje slowa 'moze'", "sprzedal cien za lepszy argument",
  "ma mape do miejsca, ktore znika po nazwaniu", "raz wygral dyskusje z czajnikiem",
  "pamieta wszystkie niedokonczone zdania", "ukrywa instrukcje obslugi chaosu",
  "ma licencje na przypadkowe skojarzenia", "nosi klucz do drzwi, ktore jeszcze nie powstaly",
  "wie, dlaczego echo czasem klamie", "ma podpisany kontrakt z poniedzialkiem",
  "potrafi rozpoznac falszywa cisze", "wymyslil slowo, ktore nic nie znaczy, ale dziala",
  "trzyma w notesie liste podejrzanych kolorow", "ma zakaz rozmowy z lustrami",
];

const PROBLEMS = [
  "sledzi go bardzo podejrzany parasol", "zgubil jeden dzien tygodnia",
  "jego kompas wskazuje najgorszy pomysl", "wszystkie odpowiedzi przychodza do niego przed pytaniami",
  "czas nalicza mu opoznienie", "drzwi odmawiaja z nim wspolpracy",
  "kazdy kubek probuje zostac jego mentorem", "ktos podmienil mu imie na instrukcje",
  "nie moze znalezc poczatku rozmowy", "jego cien sklada reklamacje",
  "przepowiednia wygasla mu w trakcie czytania", "zostal wezwany przez przedmiot bez wlasciciela",
  "poniedzialek probuje go zatrudnic", "ma za duzo trzecich opcji",
  "musi udowodnic, ze nie jest metafora", "jego walizka chce rozmawiac tylko z adminem",
  "nikt nie wierzy, ze jest postacia drugoplanowa", "zbyt wiele znakow wskazuje na niego",
  "musi odzyskac skradzione westchnienie", "jego plan ma dziure dokladnie tam, gdzie powinien miec sens",
];

const TRAITS = [
  "zawsze odpowiada pytaniem, ale tylko w srody", "mowi tak, jakby znal zakonczenie",
  "nie ufa rzeczom z parzysta liczba liter", "kazda rade zaczyna od 'technicznie'",
  "wierzy, ze przypadek ma poczucie humoru", "uznaje kubki za jednostki opiniotworcze",
  "boi sie zbyt prostych wyjasnien", "lubi robic pauzy w nieodpowiednich miejscach",
  "traktuje glitch jak forme poezji", "nadaje imiona problemom",
  "nigdy nie wybiera pierwszej opcji", "w kazdym pytaniu widzi mala pulapke",
  "mowi, ze to nie proroctwo, tylko sugestia", "potrafi obrazic sie na interpunkcje",
  "ma podejrzanie dobre wyczucie dziwnych decyzji", "podpisuje sie tylko inicjalami",
  "uznaje cisze za pelnoprawna odpowiedz", "nie rozumie normalnosci, ale szanuje wysilek",
  "ma talent do znajdowania sensu tam, gdzie go nie zaproszono",
  "zapisuje wazne mysli na niewidzialnych karteczkach",
];

const QUEST_REWARDS = [
  "prawo uzycia slowa 'prawdopodobnie' bez konsekwencji",
  "3 punkty do wiarygodnosci u krzesel",
  "tymczasowa odpornosc na najgorszy pomysl",
  "symboliczny klucz do drzwi, ktorych nie ma",
  "certyfikat rozpoznania podejrzanej ciszy",
  "jedno moralne zwyciestwo nad przypadkiem",
  "kupon na alternatywna decyzje",
  "pozwolenie na nazwanie problemu imieniem",
  "miniaturowy kompas wskazujacy klimat",
  "szacunek NPC-a i bardzo malo praktycznej wladzy",
];

const OMENS = [
  "unikaj trzeciego przycisku", "jezeli zobaczysz kolor pomaranczowy, zadaj dodatkowe pytanie",
  "dzisiaj slowo 'moze' ma podwojna moc", "nie ufaj zdaniom bez przecinka",
  "pierwsza mysl bedzie pulapka, druga bedzie zabawna", "cisza po odpowiedzi jest czescia odpowiedzi",
  "parasol wie wiecej, niz powinien", "najgorszy pomysl przyjdzie w bardzo ladnym opakowaniu",
  "kto nazwie problem, ten go oswoi", "nie wszystko, co brzmi jak blad, jest bledem",
];

const FILLERS = [
  "Zapisuje to w notesie, ktory udaje, ze go nie ma.",
  "Nie jestem pewien, ale moje krzeslo kiwa sie z uznaniem.",
  "To brzmi jak poczatek questu, ktory nie powinien miec budzetu.",
  "Przypadek spojrzal na to i udaje, ze nic nie wie.",
  "Technicznie rzecz biorac: tak. Moralnie rzecz biorac: zalezy od parasola.",
  "To pytanie ma zapach bocznego watku.",
  "Odpowiem ostroznie, bo echo juz raz mnie pozwalo.",
  "Moj kompas wskazuje 'prawdopodobnie'.",
  "Nie ufalbym tej odpowiedzi, ale szanowalbym jej odwage.",
  "W normalnym swiecie to nie ma sensu. Na szczescie nie jestesmy w normalnym swiecie.",
];

const YES_NO_OPENERS = [
  "Krotko: tak, ale nie w sposob, ktory dobrze wyglada w dokumentacji.",
  "Nie powiedzialbym, ze tak. Powiedzialbym: to zalezy od tego, kto trzyma paragon.",
  "Raczej tak, jesli zaakceptujemy, ze normalnosc jest tylko ustawieniem domyslnym.",
  "Raczej nie, chyba ze ktos juz otworzyl boczny quest.",
  "To brzmi jak pytanie, na ktore odpowiedz zmienia sie po przecinku.",
  "Tak, ale tylko w wersji wydarzen, w ktorej krzesla maja prawo glosu.",
  "Nie do konca. Widze tu bardziej objaw niz plan.",
  "Moj werdykt: mozliwe, ale podejrzane.",
  "Jesli pytasz oficjalnie: nie. Jesli pytasz chaos: oczywiscie.",
  "To jest ten typ sprawy, gdzie odpowiedz brzmi 'tak', ale przypisy sa grozniejsze od tresci.",
];

const WHY_OPENERS = [
  "Bo ktos kiedys uznal, ze prosty sens jest zbyt tani.",
  "Bo przypadek lubi udawac system, kiedy nikt nie patrzy.",
  "Bo kazdy porzadek ma w piwnicy maly karton z chaosem.",
  "Bo odpowiedz przyszla pierwsza, a pytanie tylko ja dogonilo.",
  "Bo tak dzialaja rzeczy, ktore udaja normalne zbyt przekonujaco.",
  "Bo najgorsze wyjasnienia czasem maja najlepsza frekwencje.",
  "Bo ktos dal metaforze klucze do serwerowni.",
  "Bo gdyby to mialo pelny sens, nie potrzebowalibysmy NPC-a.",
];

const OPINION_OPENERS = [
  "Moja opinia: to ma potencjal, ale trzeba odpiac od tego trzy niepotrzebne alarmy.",
  "Brzmi jak pomysl, ktory jest glupi tylko do momentu, az zacznie dzialac.",
  "Widze w tym klimat, ale tez maly znak ostrzegawczy przy wejsciu.",
  "To jest podejrzanie sensowne. Nie ufalbym temu bez nadzoru.",
  "To moze zadzialac, jesli nie bedziemy wymagac od tego godnosci.",
  "Jako NPC zatwierdzam, ale jako obywatel chaosu prosze o dodatkowy test.",
  "Ma energie bocznego questa, ktory przypadkiem staje sie glownym watkiem.",
  "Nie jest to normalne. To akurat zaleta.",
];

const CONVERSATION_CLOSES = [
  "Dodalbym tylko jeden warunek: niech ktos nazwie problem, zanim problem nazwie nas.",
  "W moim notesie to dostaje znaczek 'obserwowac z bezpiecznej odleglosci'.",
  "Jesli pojawi sie parasol, udajemy, ze to bylo planowane.",
  "To nie jest porada prawna, to szept z korytarza bocznych questow.",
  "Najwazniejsze: nie klikaj trzeciej opcji bez swiadka.",
  "Tyle moge powiedziec, zanim echo zacznie poprawiac moje zdania.",
  "Brzmi jak cos, co powinno miec instrukcje, ale zgubilo ja celowo.",
  "Zostawiam to na stole i odsuwam sie powoli.",
];

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(items, random) {
  return items[Math.floor(random() * items.length)];
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

function buildNpc(guildId, timeZone) {
  const dayKey = getDayKey(timeZone);
  const random = seededRandom(hashString(`${guildId}:${dayKey}:chaos-npc`));
  const name = pick(NAMES, random);
  const nickname = pick(NICKNAMES, random);
  return {
    dayKey,
    name,
    nickname,
    fullName: `${name} "${nickname}"`,
    job: pick(JOBS, random),
    place: pick(PLACES, random),
    secret: pick(SECRETS, random),
    problem: pick(PROBLEMS, random),
    trait: pick(TRAITS, random),
    reward: pick(QUEST_REWARDS, random),
    omen: pick(OMENS, random),
    filler: pick(FILLERS, random),
  };
}

function stripBotMention(content, botId) {
  return String(content || "")
    .replace(new RegExp(`<@!?${botId}>`, "g"), "")
    .trim()
    .replace(/\s+/g, " ");
}

function getOptionsFromPrompt(prompt) {
  const normalized = prompt
    .replace(/[?!.]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^(wybierz|wybor|wybór|co wybrac|co wybrać|zdecyduj|decyduj)\s+/i, "")
    .trim();

  if (normalized.includes(" czy ")) {
    return normalized.split(/\s+czy\s+/i).map((item) => item.trim()).filter(Boolean);
  }

  if (normalized.includes(",")) {
    return normalized.split(",").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function getMessageRandom(npc, prompt, salt) {
  return seededRandom(hashString(`${npc.dayKey}:${npc.fullName}:${salt}:${prompt}`));
}

function pickFromForMessage(items, npc, prompt, salt) {
  return pick(items, getMessageRandom(npc, prompt, salt));
}

function formatIntro(npc) {
  return [
    `Jestem **${npc.fullName}**.`,
    `Zawod: ${npc.job}.`,
    `Miejsce spotkania: ${npc.place}.`,
    `Sekret: ${npc.secret}.`,
    `Problem: ${npc.problem}.`,
    `Cecha specjalna: ${npc.trait}.`,
  ].join("\n");
}

function formatQuest(npc) {
  return [
    `**Quest od ${npc.fullName}:**`,
    `Znajdz albo wymysl rzecz, ktora rozwiaze problem: **${npc.problem}**.`,
    `Warunek: musi miec zwiazek z miejscem **${npc.place}**.`,
    `Nagroda: ${npc.reward}.`,
  ].join("\n");
}

function formatOmen(npc) {
  return [
    `**Znak od ${npc.fullName}:**`,
    npc.omen,
    `Interpretacja: ${npc.filler}`,
  ].join("\n");
}

function formatChoice(npc, prompt) {
  const options = getOptionsFromPrompt(prompt);
  if (options.length < 2) {
    return `${npc.fullName} mowi: daj mi przynajmniej dwie opcje, najlepiej z "czy" albo po przecinku.`;
  }

  const seed = hashString(`${npc.dayKey}:${prompt}:${npc.fullName}`);
  const random = seededRandom(seed);
  const chosen = pick(options, random);
  return [
    `${npc.fullName} wybiera: **${chosen}**.`,
    `Powod: ${pickFromForMessage(FILLERS, npc, prompt, "choice-reason")}`,
  ].join("\n");
}

function formatDefault(npc, prompt) {
  const hasQuestion = prompt.includes("?");
  if (hasQuestion) {
    const lowered = prompt.toLowerCase();
    const opener = lowered.startsWith("dlaczego") || lowered.startsWith("czemu")
      ? pickFromForMessage(WHY_OPENERS, npc, prompt, "why")
      : lowered.startsWith("czy")
        ? pickFromForMessage(YES_NO_OPENERS, npc, prompt, "yes-no")
        : pickFromForMessage(OPINION_OPENERS, npc, prompt, "question");
    const close = pickFromForMessage(CONVERSATION_CLOSES, npc, prompt, "close");

    return [
      `${npc.fullName}: ${opener}`,
      close,
    ].join("\n");
  }

  const opener = pickFromForMessage(OPINION_OPENERS, npc, prompt, "statement");
  const close = pickFromForMessage(CONVERSATION_CLOSES, npc, prompt, "statement-close");
  return [
    `${npc.fullName}: ${opener}`,
    `Zapis w notesie: "${prompt || "cisza"}".`,
    close,
  ].join("\n");
}

export function buildNpcReply({ content, botId, guildId, timeZone }) {
  const npc = buildNpc(guildId || "direct", timeZone || "Europe/Warsaw");
  const prompt = stripBotMention(content, botId);
  const lowered = prompt.toLowerCase();

  if (!prompt || /kim jestes|kim jesteś|przedstaw|npc|opis/.test(lowered)) {
    return formatIntro(npc);
  }

  if (/quest|misja|zadanie|daj cos|daj coś/.test(lowered)) {
    return formatQuest(npc);
  }

  if (/omen|znak|przepowiednia|wrozba|wróżba|los/.test(lowered)) {
    return formatOmen(npc);
  }

  if (/^(wybierz|wybor|wybór|co wybrac|co wybrać|zdecyduj|decyduj)\b/.test(lowered) || lowered.includes(",")) {
    return formatChoice(npc, prompt);
  }

  return formatDefault(npc, prompt);
}
