import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import config from '../payload.config'

const payload = await getPayload({ config })

function textNode(text: string) {
  return { type: 'text', text, format: 0, detail: 0, mode: 'normal' as const, style: '', version: 1 }
}

function p(text: string) {
  return {
    type: 'paragraph',
    children: [textNode(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function h(text: string, tag: 'h2' | 'h3' = 'h3') {
  return {
    type: 'heading',
    tag,
    children: [textNode(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

function ul(items: string[]) {
  return {
    type: 'list',
    tag: 'ul' as const,
    listType: 'bullet' as const,
    start: 1,
    children: items.map((text, i) => ({
      type: 'listitem',
      value: i + 1,
      children: [textNode(text)],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lexicalDoc(nodes: any[]) {
  return {
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const caseStudyLabels = {
  en: { overview: 'Overview', features: 'Features', technologies: 'Technologies', highlights: 'Technical highlights', status: 'Status' },
  hu: { overview: 'Áttekintés', features: 'Funkciók', technologies: 'Technológiák', highlights: 'Technikai kiemelések', status: 'Státusz' },
}

function caseStudy(
  locale: 'en' | 'hu',
  content: { overview: string[]; features: string[]; technologies: string[]; highlights: string[]; status: string },
) {
  const l = caseStudyLabels[locale]
  return [
    h(l.overview, 'h2'),
    ...content.overview.map(p),
    h(l.features, 'h2'),
    ul(content.features),
    h(l.technologies, 'h2'),
    ul(content.technologies),
    h(l.highlights, 'h2'),
    ul(content.highlights),
    h(l.status, 'h2'),
    p(content.status),
  ]
}

async function seedSiteSettings() {
  const en = {
    name: 'Csanád Senk',
    role: 'Full-stack developer',
    location: 'Debrecen, Hungary',
    currentRoleLabel: 'Currently',
    currentRoleValue: 'Full-stack developer, UPRIVE Design Studio',
    availabilityLabel: 'Availability',
    availabilityStatus: 'available' as const,
    availabilityValue: 'Taking on new work',
    heroDescription:
      'I build websites, web applications and dashboards in Next.js and TypeScript — and AI systems, including agent-driven pipelines that write, test and ship real software.',
    contactDescription:
      'Tell me in a few sentences what you want built — a website, an internal system, something with AI in it. I reply within two working days, in Hungarian or English.',
    email: 'hello@csanadsenk.dev',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    accentColor: 'blue' as const,
  }

  const hu = {
    role: 'Full-stack fejlesztő',
    currentRoleLabel: 'Jelenleg',
    currentRoleValue: 'Full-stack fejlesztő, UPRIVE Design Studio',
    availabilityLabel: 'Elérhetőség',
    availabilityValue: 'Vállalok új munkát',
    heroDescription:
      'Weboldalakat, webalkalmazásokat és dashboardokat építek Next.js-ben és TypeScriptben — valamint AI-rendszereket és ügynök-vezérelt pipeline-okat, amelyek valódi, működő szoftvert írnak, tesztelnek és szállítanak.',
    contactDescription:
      'Írja le pár mondatban, mit szeretne megépíteni — weboldalt, belső rendszert vagy AI-megoldást. Két munkanapon belül válaszolok, magyarul vagy angolul.',
  }

  await payload.updateGlobal({ slug: 'siteSettings', locale: 'en', data: en })
  await payload.updateGlobal({ slug: 'siteSettings', locale: 'hu', data: hu })
  console.log('Seeded siteSettings')
}

async function seedAboutContent() {
  const en = {
    bioParagraph1:
      "I'm a full-stack developer in Debrecen, currently at UPRIVE Design Studio. I build websites, web applications and dashboards — usually from the first conversation through to the thing running in production. I like projects with one person accountable end to end.",
    bioParagraph2:
      "Over the last few years AI has moved to the centre of that work — not only building AI features into products, but building agent-driven pipelines that generate, test and ship real software. In practice it means a smaller team gets a serious system out faster, and it's the strongest thing I bring to a project.",
    stack: [
      { category: 'Core', items: 'TypeScript · React · Next.js · Node', highlighted: false },
      {
        category: 'AI',
        items: 'Claude API · OpenAI API · agent orchestration · RAG · evals · MCP',
        highlighted: true,
      },
      { category: 'Interface', items: 'Tailwind · CSS · Framer Motion · Figma', highlighted: false },
      { category: 'Data', items: 'PostgreSQL · Prisma · Supabase · Redis', highlighted: false },
      { category: 'Infra', items: 'Vercel · Docker · GitHub Actions · Playwright', highlighted: false },
    ],
  }

  const hu = {
    bioParagraph1:
      'Full-stack fejlesztő vagyok Debrecenben, jelenleg az UPRIVE Design Studiónál. Weboldalakat, webalkalmazásokat és dashboardokat építek — általában a beszélgetéstől a kész, élő rendszerig. Szeretem, ha egy projektnek egy gazdája van, aki a tervezéstől a szállításig végigviszi.',
    bioParagraph2:
      'Az elmúlt években az AI került a munkám közepébe: nem csak AI-funkciókat építek termékekbe, hanem olyan ügynök-vezérelt pipeline-okat is, amelyek maguk generálnak, tesztelnek és szállítanak valódi szoftvert. Ez azt jelenti, hogy kisebb csapattal, gyorsabban lehet komoly rendszert kiadni — és ez ma a legerősebb dolog, amit egy ügyfélnek hozni tudok.',
  }

  await payload.updateGlobal({ slug: 'aboutContent', locale: 'en', data: en })
  await payload.updateGlobal({ slug: 'aboutContent', locale: 'hu', data: hu })
  console.log('Seeded aboutContent')
}

async function seedCapabilities() {
  const en = {
    items: [
      {
        index: '01',
        title: 'Websites',
        body: 'Marketing sites that load fast, read well on a phone and turn visitors into enquiries. Built so you can edit the content yourself, without calling a developer for every change.',
        isCoreSpecialism: false,
      },
      {
        index: '02',
        title: 'Web applications',
        body: 'Logins, payments, permissions, data. The software your business runs on day to day, designed to hold up as the business grows.',
        isCoreSpecialism: false,
      },
      {
        index: '03',
        title: 'Dashboards',
        body: 'Your numbers in one place, live. Reports you can act on, instead of spreadsheets someone stitches together at the end of every month.',
        isCoreSpecialism: false,
      },
      {
        index: '04',
        title: 'AI integration & automation',
        body: 'Assistants, search and generation built into your product — and agent pipelines that write, test and ship code themselves. Work that used to take a week takes an afternoon.',
        isCoreSpecialism: true,
      },
    ],
  }

  const hu = {
    items: [
      {
        index: '01',
        title: 'Weboldalak',
        body: 'Gyorsan betöltő, mobilon is jól olvasható oldalak, amelyek megkeresést hoznak. Úgy építem meg, hogy a tartalmat utána Ön is tudja szerkeszteni — ne kelljen minden apró módosításért fejlesztőt hívni.',
        isCoreSpecialism: false,
      },
      {
        index: '02',
        title: 'Webalkalmazások',
        body: 'Belépés, fizetés, jogosultságok, adatbázis — az a szoftver, amin a cég napi működése fut. Úgy tervezem, hogy a növekedést is elbírja.',
        isCoreSpecialism: false,
      },
      {
        index: '03',
        title: 'Dashboardok',
        body: 'A számai egy helyen, élőben. Olyan riportok, amelyekre lehet lépni — nem táblázatok, amiket minden hónap végén kézzel kell összerakni.',
        isCoreSpecialism: false,
      },
      {
        index: '04',
        title: 'AI-integráció és automatizálás',
        body: 'Asszisztensek, keresés és tartalomgenerálás közvetlenül a termékébe építve — és ügynök-vezérelt pipeline-ok, amelyek maguk írják, tesztelik és szállítják a kódot. Ami korábban egy hét volt, egy délután lesz.',
        isCoreSpecialism: true,
      },
    ],
  }

  await payload.updateGlobal({ slug: 'capabilities', locale: 'en', data: en })
  await payload.updateGlobal({ slug: 'capabilities', locale: 'hu', data: hu })
  console.log('Seeded capabilities')
}

async function seedUiText() {
  const en = {
    nav: { work: 'Work', capabilities: 'What I do', about: 'About', contact: 'Contact' },
    cta: "Let's talk",
    hero: { primaryCta: 'Start a project', secondaryCta: 'See the work', location: 'Location' },
    work: {
      eyebrow: 'Live products & client work',
      heading: 'Selected work',
      viewProject: 'View project',
      aiBadge: 'AI / automation',
    },
    capabilities: {
      eyebrow: 'From plan to launch',
      heading: 'What I do',
      coreSpecialism: 'Core specialism',
    },
    about: { eyebrow: 'Debrecen, HU', heading: 'About', stackLabel: 'Stack' },
    contact: {
      heading: "Let's talk",
      emailLabel: 'Or email directly',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailFieldLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      messageLabel: 'Message',
      messagePlaceholder: 'What are you looking to build?',
      submit: 'Send message',
      success: "Thanks — I'll reply shortly.",
    },
    footer: { github: 'GitHub', linkedin: 'LinkedIn' },
  }

  const hu = {
    nav: { work: 'Munkáim', capabilities: 'Amit csinálok', about: 'Rólam', contact: 'Kapcsolat' },
    cta: 'Beszéljünk',
    hero: {
      primaryCta: 'Beszéljünk a projektről',
      secondaryCta: 'Munkáim megtekintése',
      location: 'Helyszín',
    },
    work: {
      eyebrow: 'Élő termékek és ügyfélmunkák',
      heading: 'Munkáim',
      viewProject: 'Projekt megtekintése',
      aiBadge: 'AI / automatizálás',
    },
    capabilities: {
      eyebrow: 'Tervezéstől a szállításig',
      heading: 'Amit csinálok',
      coreSpecialism: 'Kiemelt szakterület',
    },
    about: { eyebrow: 'Debrecen, HU', heading: 'Rólam', stackLabel: 'Technológiák' },
    contact: {
      heading: 'Kapcsolat',
      emailLabel: 'Vagy írjon közvetlenül',
      nameLabel: 'Név',
      namePlaceholder: 'Az Ön neve',
      emailFieldLabel: 'E-mail',
      emailPlaceholder: 'you@company.com',
      messageLabel: 'Üzenet',
      messagePlaceholder: 'Mit szeretne megépíteni?',
      submit: 'Üzenet küldése',
      success: 'Köszönöm — hamarosan válaszolok.',
    },
    footer: { github: 'GitHub', linkedin: 'LinkedIn' },
  }

  await payload.updateGlobal({ slug: 'uiText', locale: 'en', data: en })
  await payload.updateGlobal({ slug: 'uiText', locale: 'hu', data: hu })
  console.log('Seeded uiText')
}

async function seedProjects() {
  const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets', 'projects')

  const projects = [
    {
      index: '01',
      title: 'Quponly',
      slug: 'quponly',
      techTags: ['Next.js', 'Payload CMS', 'Stripe', 'Apple Wallet', 'Google Wallet'],
      screenshot: 'quponly.png',
      screenshotAlt: 'Quponly homepage showing a digital loyalty card saved to a phone wallet',
      isCoreSpecialism: false,
      featured: true,
      en: {
        summary:
          'Digital loyalty and coupon platform — businesses issue Apple and Google Wallet passes in minutes, customers save them without installing an app, and staff redeem with a companion scanner app. Live at quponly.com.',
        detail: caseStudy('en', {
          overview: [
            "Printed loyalty cards and paper coupons don't fit how people actually shop anymore, but most small businesses can't justify building and maintaining a native app just to run a loyalty program — and generic marketing-automation tools don't understand stamps, points or coupon redemption.",
            'Quponly is a multi-tenant SaaS platform: a business signs up, creates a project, and designs a card in a dashboard. On publish, the platform issues it as a real Apple Wallet or Google Wallet pass — the customer scans a QR code once and the card lands directly in their phone wallet, no app install. On the other side, a companion scanner app lets staff redeem a pass by camera in under a second.',
          ],
          features: [
            'No-code dashboard for designing and publishing digital loyalty and coupon cards',
            'Native Apple Wallet and Google Wallet pass issuance via a single QR-code scan, no app install for the customer',
            'Point and stamp collection alongside straightforward one-tap coupon redemption',
            'Push notifications delivered directly onto the wallet pass, visible on the lock screen',
            'Companion staff scanner app (iOS/Android) for camera-based redemption in under a second',
            'Tiered subscription plans (Starter / Business / Professional) with per-card usage limits and overage billing',
            'Hungarian e-invoicing generated automatically for every subscription charge',
          ],
          technologies: [
            'Next.js 15 (App Router) — customer dashboard and marketing site',
            'Payload CMS 3 on Postgres — multi-tenant data layer (Business → Project → Cards/Passes/Customers)',
            'passkit-generator — signs and generates real .pkpass files for Apple Wallet',
            'Google Wallet Objects API — issues the Android-side pass equivalent',
            'node-apn — sends Apple Push Notification service pass-update pushes',
            'Stripe — subscription billing and usage-based overage pricing',
            'szamlazz.js — Hungarian e-invoicing, generated per charge',
            'Expo / React Native — the companion scanner app, a separate repo (quponly-scanner) sharing the same backend API',
          ],
          highlights: [
            "Wallet passes aren't static documents — every redemption triggers a signed pass regeneration plus an APNs push so the balance updates on the lock screen without the customer reopening anything",
            'Multi-tenant data model supports independent businesses, each running their own card designs, pricing tier and customer list, with no cross-tenant data leakage',
            'Scanner app and dashboard share one backend API and auth system, so a redemption from a phone camera updates the same record the business owner sees live',
            'Usage-tier enforcement (300 / 2,000 / 5,000 card caps with per-card overage pricing) implemented at the subscription layer',
          ],
          status:
            'Live in production at quponly.com, running real paying businesses since early 2026. 195 commits — the most actively developed project in this portfolio, evidenced by a 322KB production database backup.',
        }),
      },
      hu: {
        summary:
          'Digitális hűségkártya- és kuponplatform — a vállalkozások percek alatt bocsátanak ki Apple és Google Wallet kártyákat, a vásárlók app nélkül mentik el őket, a személyzet pedig egy társ-scanner alkalmazással váltja be. Élesben: quponly.com.',
        detail: caseStudy('hu', {
          overview: [
            'A nyomtatott hűségkártyák és papíralapú kuponok mára nem illeszkednek a vásárlási szokásokhoz, ugyanakkor egy kisvállalkozásnak ritkán éri meg saját mobilalkalmazást építeni és karbantartani csak a hűségprogramhoz — az általános marketingautomatizálási eszközök pedig nem értik a pecsétet, pontot vagy kuponbeváltást.',
            'A Quponly egy több ügyfelet kiszolgáló SaaS platform: a vállalkozás regisztrál, létrehoz egy projektet, és megtervezi a kártyát egy dashboardon. Publikáláskor a platform valódi Apple vagy Google Wallet kártyaként bocsátja ki — a vásárló egyetlen QR-kód-beolvasással a telefonja walletjébe kapja a kártyát, app telepítése nélkül. A másik oldalon egy társ scanner alkalmazás teszi lehetővé, hogy a személyzet egy másodperc alatt beváltson egy kártyát kamerával.',
          ],
          features: [
            'Kódolás nélküli dashboard digitális hűség- és kuponkártyák megtervezéséhez és publikálásához',
            'Natív Apple Wallet és Google Wallet kártyakiállítás egyetlen QR-kód beolvasásával, app telepítése nélkül',
            'Pont- és pecsétgyűjtés, valamint egyszerű, egykoppintásos kuponbeváltás',
            'Push-értesítések közvetlenül a wallet kártyán, láthatóan a zárolt képernyőn',
            'Társ scanner alkalmazás (iOS/Android) a személyzetnek, kamerás beváltással egy másodperc alatt',
            'Szintezett előfizetési csomagok (Starter / Business / Professional) kártyánkénti használati korláttal és keret-túllépési díjazással',
            'Automatikusan generált magyar e-számla minden előfizetési terheléshez',
          ],
          technologies: [
            'Next.js 15 (App Router) — ügyfél-dashboard és marketing oldal',
            'Payload CMS 3 Postgresen — több ügyfelet kiszolgáló adatréteg (Vállalkozás → Projekt → Kártyák/Passok/Vásárlók)',
            'passkit-generator — valódi, aláírt .pkpass fájlokat generál az Apple Wallethez',
            'Google Wallet Objects API — kiállítja az Android-oldali kártya megfelelőjét',
            'node-apn — Apple Push Notification service kártyafrissítési push-okat küld',
            'Stripe — előfizetési számlázás és használatalapú keret-túllépési árazás',
            'szamlazz.js — magyar e-számlázás, terhelésenként generálva',
            'Expo / React Native — a társ scanner alkalmazás, külön repóban (quponly-scanner), ugyanazt a backend API-t használva',
          ],
          highlights: [
            'A wallet kártyák nem statikus dokumentumok — minden beváltás egy aláírt kártya-újragenerálást és egy APNs push-t indít, hogy az egyenleg a zárolt képernyőn is frissüljön anélkül, hogy a vásárló bármit újranyitna',
            'A több ügyfelet kiszolgáló adatmodell önálló vállalkozásokat támogat, mindegyik saját kártyatervekkel, árazási szinttel és vásárlói listával, ügyfelek közötti adatszivárgás nélkül',
            'A scanner alkalmazás és a dashboard egy backend API-t és hitelesítési rendszert oszt meg, így egy telefonos kamerás beváltás ugyanazt a rekordot frissíti, amit a vállalkozás tulajdonosa élőben lát',
            'Használati szint érvényesítés (300 / 2000 / 5000 kártyás korlát kártyánkénti keret-túllépési árazással) az előfizetési rétegen megvalósítva',
          ],
          status:
            'Élesben fut a quponly.com oldalon, fizető vállalkozásokkal 2026 eleje óta. 195 commit — ez a lista legaktívabban fejlesztett projektje, amit egy 322KB-os éles adatbázis-mentés is igazol.',
        }),
      },
    },
    {
      index: '02',
      title: 'Getrive',
      slug: 'getrive',
      techTags: ['Next.js', 'Prisma', 'Stripe', 'AI SDK'],
      screenshot: 'getrive.png',
      screenshotAlt: 'Getrive landing page showing a flagged Reddit post next to its AI-drafted reply',
      isCoreSpecialism: true,
      featured: true,
      en: {
        summary:
          'B2B SaaS that watches Reddit and Hacker News for people describing the exact problem your product solves, scores each post with AI, and drafts an honest reply for you to review before it ever goes out. Live at getrive.app.',
        detail: caseStudy('en', {
          overview: [
            "Cold outreach and generic automation burn trust fast, and most early-stage founders genuinely don't know where the people who need their product are already talking about the problem out loud — so they either spam strangers or say nothing.",
            "Getrive runs a continuous ingestion scheduler across Reddit, Hacker News and IndieHackers, scores every post against the product's stored positioning with AI, and drafts a contextual reply — but nothing ever sends itself. Every draft sits in a review queue until a human approves it, and every approved send is attributed back to signup.",
          ],
          features: [
            'Continuous, multi-source monitoring across Reddit, Hacker News and IndieHackers',
            "AI relevance scoring of every post against the product's stored positioning, not keyword rules",
            'Contextual, on-brand draft replies generated per matching post',
            'Human-in-the-loop review queue — approve, edit or skip; nothing sends automatically',
            'Signup attribution: every approved reply carries a tracked link back to conversion',
            'Early-access pricing locked in for first users, billed through Stripe',
            'A published guides section with the underlying "finding your first users" playbook',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres — typed data layer',
            'NextAuth v5 — authentication',
            'AI SDK (Anthropic + OpenAI) — relevance scoring and reply drafting',
            'Stripe — subscription billing (currently free during early access)',
            'Resend — transactional email',
            'PostHog — product analytics',
            'Sentry — error tracking',
            'Playwright — end-to-end test coverage',
          ],
          highlights: [
            'Fair, continuous ingestion scheduler polling multiple sources oldest-checked-first, rather than periodic batch scraping that would starve slower sources',
            "Positioning-aware AI scoring, not keyword matching — the system reasons about whether a post genuinely describes the product's problem, not whether it contains certain words",
            "Hard architectural separation between draft generation and send — there is no code path for autonomous posting, by design ('auto-reply systems disabled by design' is an actual constraint, not just copy)",
            'Per-reply tracked attribution links (/r/{id}) connecting a specific Reddit/HN comment to a specific signup',
            'GDPR-oriented documentation (a RoPA and a DPIA specifically covering the signal-monitoring pipeline) written because the product processes public posts at scale',
          ],
          status:
            'Live in early access at getrive.app, free during early access with pricing locked in for early users. 67 commits, currently iterating on usage-based pricing on a feature branch.',
        }),
      },
      hu: {
        summary:
          'B2B SaaS, amely figyeli a Redditet és a Hacker Newst azokért a bejegyzésekért, amelyek pontosan a te terméked által megoldott problémáról szólnak, AI-val pontozza a relevanciát, és egy őszinte választ fogalmaz — amit te hagysz jóvá, mielőtt kimegy. Élesben: getrive.app.',
        detail: caseStudy('hu', {
          overview: [
            'A hideg megkeresés és az általános automatizálás gyorsan felégeti a bizalmat, és a legtöbb korai fázisú alapító valójában nem tudja, hol beszélnek már most is nyíltan azok, akiknek szükségük lenne a termékére — így vagy idegeneket spammelnek, vagy nem csinálnak semmit.',
            'A Getrive egy folyamatos beolvasási ütemezőt futtat a Redditen, a Hacker Newson és az IndieHackersen, minden bejegyzést AI-val pontoz a termék eltárolt pozicionálásához mérve, és kontextusfüggő választ fogalmaz — de semmi nem küldi el magát. Minden vázlat egy jóváhagyási sorban vár, amíg egy ember rá nem bólint, és minden jóváhagyott küldés vissza van vezetve a regisztrációig.',
          ],
          features: [
            'Folyamatos, több forrást átfogó figyelés a Redditen, a Hacker Newson és az IndieHackersen',
            'AI-alapú relevanciapontozás minden bejegyzéshez a termék eltárolt pozicionálásához mérve, nem kulcsszószabályok alapján',
            'Kontextusfüggő, márkahangnemben megírt válaszvázlatok minden találatra',
            'Emberi jóváhagyási sor — jóváhagyás, szerkesztés vagy kihagyás; semmi nem küldődik automatikusan',
            'Regisztráció-attribúció: minden jóváhagyott válaszhoz egy nyomon követett link tartozik a konverzióig',
            'Korai hozzáférési árazás, rögzítve az első felhasználóknak, Stripe-on számlázva',
            'Publikált útmutató szekció az „első felhasználók megtalálása” alapú playbookkal',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres — típusos adatréteg',
            'NextAuth v5 — hitelesítés',
            'AI SDK (Anthropic + OpenAI) — relevanciapontozás és válaszvázlat-generálás',
            'Stripe — előfizetési számlázás (jelenleg ingyenes a korai hozzáférés alatt)',
            'Resend — tranzakciós e-mail',
            'PostHog — termékanalitika',
            'Sentry — hibakövetés',
            'Playwright — end-to-end tesztlefedettség',
          ],
          highlights: [
            'Igazságos, folyamatos beolvasási ütemező, ami több forrást a legrégebben ellenőrzött elve alapján kérdez le, nem időszakos kötegelt scraping, ami éheztetné a lassabb forrásokat',
            'Pozicionálás-tudatos AI-pontozás, nem kulcsszóegyezés — a rendszer azt mérlegeli, hogy egy bejegyzés valóban leírja-e a termék problémáját, nem azt, hogy tartalmaz-e bizonyos szavakat',
            'Szigorú architekturális elválasztás a vázlatgenerálás és a küldés között — nincs olyan kódút, ami autonóm posztolást tenne lehetővé, szándékosan (az „automatikus válaszrendszerek tervezés szerint letiltva” egy valódi megkötés, nem csak szöveg)',
            'Válaszonkénti nyomon követett attribúciós linkek (/r/{id}), amik egy konkrét Reddit-/HN-hozzászólást egy konkrét regisztrációhoz kötnek',
            'GDPR-orientált dokumentáció (egy RoPA és egy kifejezetten a jelfigyelési pipeline-t lefedő DPIA), mivel a termék nyilvános bejegyzéseket dolgoz fel nagy mennyiségben',
          ],
          status:
            'Élesben, korai hozzáférésben fut a getrive.app oldalon, ingyenesen a korai hozzáférés alatt, rögzített árazással a korai felhasználóknak. 67 commit, jelenleg egy használatalapú árazási feature branch-en.',
        }),
      },
    },
    {
      index: '03',
      title: 'Leasetown',
      slug: 'leasetown',
      techTags: ['Next.js', 'Payload CMS', 'better-auth', 'Playwright'],
      screenshot: 'leasetown.png',
      screenshotAlt: 'Leasetown car listing grid with live lease pricing',
      isCoreSpecialism: false,
      featured: true,
      en: {
        summary:
          'Car leasing and subscription marketplace — live inventory, lease-term pricing, KYC-backed checkout and a protected customer dashboard for managing a subscription end to end. Live at leasetown.hu.',
        detail: caseStudy('en', {
          overview: [
            'Financing a car the traditional way is slow and opaque. A subscription model fixes the experience, but it only works if the inventory, pricing, and compliance behind it are actually real-time — not a PDF price list from three weeks ago.',
            'Leasetown is a full marketplace built on Payload CMS. Each car carries its own lease-term × down-payment × mileage-cap pricing matrix rather than a single flat monthly price, and onboarding runs through a KYC document flow gating checkout, ahead of a protected customer dashboard for managing an active subscription end to end.',
          ],
          features: [
            'Live vehicle catalog with real inventory, manufacturer photography and availability dates',
            'Per-vehicle pricing resolved from a lease-term × down-payment × mileage-cap matrix',
            'KYC document upload as part of onboarding, ahead of checkout',
            'Protected customer dashboard: active subscriptions, billing history, handover scheduling',
            'Coupon codes and promotional pricing flags',
            'Proposal workflow for larger fleet/business deals',
            'Full account system: registration, login, session management',
          ],
          technologies: [
            'Next.js 15.4 (App Router), React 19',
            'Payload CMS 3 on Postgres — vehicle catalog, leasing proposals, subscriptions, coupon codes, FAQ/legal/KYC content globals',
            'better-auth bridged into Payload via payload-auth — session/auth handling',
            'Radix UI + react-hook-form + zod — accessible forms with schema validation',
            'DigitalOcean Spaces (S3-compatible) — vehicle photography storage at production scale',
            'Playwright — end-to-end test suite',
            'Vitest — integration test suite',
            'Docker — local/dev environment parity',
          ],
          highlights: [
            'Per-vehicle pricing matrix (term × down payment × mileage) resolved live in the UI as the customer adjusts any variable — a genuine small pricing-engine problem across dozens of cars and multiple term structures',
            'KYC document flow gating checkout, not bolted on after the fact',
            "better-auth bridged into Payload via payload-auth for auth ergonomics better-auth provides while staying inside Payload's data layer",
            'Real end-to-end (Playwright) and integration (Vitest) test coverage — meaningful given real money and real KYC documents are involved',
          ],
          status:
            'Live at leasetown.hu with real inventory and real customers. 59 commits, actively developed.',
        }),
      },
      hu: {
        summary:
          'Autólízing és -előfizetési piactér — élő készlet, futamidő szerinti árazás, KYC-alapú fizetés és védett ügyfél-dashboard az előfizetés teljes kezeléséhez. Élesben: leasetown.hu.',
        detail: caseStudy('hu', {
          overview: [
            'A hagyományos autófinanszírozás lassú és átláthatatlan. Az előfizetéses modell javít ezen az élményen, de csak akkor működik, ha a mögötte álló készlet, árazás és megfelelőség valóban valós idejű — nem egy három hete frissített PDF árlista.',
            'A Leasetown egy teljes piactér, Payload CMS alapokon. Minden autó saját futamidő × önrész × kilométerkorlát árazási mátrixszal rendelkezik egyetlen fix havidíj helyett, az onboarding pedig egy KYC-dokumentumfolyamaton keresztül zajlik a fizetés előtt, amit egy védett ügyfél-dashboard követ az aktív előfizetés teljes kezeléséhez.',
          ],
          features: [
            'Élő járműkatalógus valódi készlettel, gyártói fotókkal és elérhetőségi dátumokkal',
            'Járművenkénti árazás futamidő × önrész × kilométerkorlát mátrixból számolva',
            'KYC-dokumentumfeltöltés az onboarding részeként, a fizetés előtt',
            'Védett ügyfél-dashboard: aktív előfizetések, számlázási előzmények, átadás-ütemezés',
            'Kuponkódok és promóciós árazási jelölések',
            'Ajánlatkezelési folyamat nagyobb flotta-/üzleti üzletekhez',
            'Teljes fiókrendszer: regisztráció, bejelentkezés, munkamenet-kezelés',
          ],
          technologies: [
            'Next.js 15.4 (App Router), React 19',
            'Payload CMS 3 Postgresen — járműkatalógus, lízingajánlatok, előfizetések, kuponkódok, GYIK/jogi/KYC tartalmi globálisok',
            'better-auth, payload-authon keresztül a Payloadba hidalva — munkamenet-/hitelesítéskezelés',
            'Radix UI + react-hook-form + zod — akadálymentes űrlapok séma-validációval',
            'DigitalOcean Spaces (S3-kompatibilis) — járműfotó-tárolás éles méretben',
            'Playwright — end-to-end tesztcsomag',
            'Vitest — integrációs tesztcsomag',
            'Docker — helyi/fejlesztői környezet egyezés',
          ],
          highlights: [
            'Járművenkénti árazási mátrix (futamidő × önrész × kilométerkorlát), élőben feloldva a felületen, ahogy a vásárló bármelyik változót módosítja — valódi, apró árazómotor-probléma több tucat autó és több futamidő-struktúra esetén',
            'KYC-dokumentumfolyamat a fizetés előtt, nem utólag odabiggyesztve',
            'A better-auth a payload-authon keresztül van a Payloadba hidalva, hogy megkapja a better-auth kényelmét, miközben a Payload adatrétegén belül marad',
            'Valódi end-to-end (Playwright) és integrációs (Vitest) tesztlefedettség — ez akkor számít, amikor valódi pénz és valódi KYC-dokumentumok forognak kockán',
          ],
          status: 'Élesben fut a leasetown.hu oldalon, valódi készlettel és valódi ügyfelekkel. 59 commit, aktív fejlesztés alatt.',
        }),
      },
    },
    {
      index: '04',
      title: 'Maturely',
      slug: 'maturely',
      techTags: ['Next.js', 'Prisma', 'Vercel Sandbox', 'AI SDK'],
      screenshot: 'maturely.png',
      screenshotAlt: 'Maturely dashboard showing a prioritized security findings queue',
      isCoreSpecialism: true,
      featured: false,
      en: {
        summary:
          'Weekly, plain-English security and business-logic audits for solo founders who shipped fast with an AI coding tool — scans the codebase, flags real risk in auth, payments and customer data, and hands back a fix-ready prompt.',
        detail: caseStudy('en', {
          overview: [
            "Solo and two-person teams who shipped fast with an AI coding tool now have real users — and real risk they can't see, because nobody on the team is a security engineer and raw scanner output (hundreds of generic SAST warnings) is unreadable noise nobody will ever triage.",
            "Maturely runs a hybrid detection pipeline — deterministic scanners plus a custom LLM lane built specifically to reason about payment and auth logic — and translates every finding into a plain-English write-up with a copy-ready fix prompt. It connects through a GitHub App and can open the fix directly as a pull request.",
          ],
          features: [
            'Weekly automated security and business-logic scans of a connected GitHub repo',
            'Findings organized into a prioritized action queue by area: payment, authentication, customer data, code quality',
            'Every finding explained in plain English — what the risk is and why it matters',
            'Copy-ready, scoped fix prompt per finding, written for a coding agent',
            'One-click "open as pull request" auto-fix flow via the GitHub App',
            'Weekly digest email summarizing new and resolved findings',
            'Security health score with week-over-week trend tracking',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres',
            'NextAuth v5 — GitHub OAuth plus GitHub App install flow',
            'Semgrep + ESLint — static analysis layer',
            'Custom LLM detection lane (AI SDK: Anthropic, Google, OpenAI) — semantic payment/auth risk detection',
            'Vercel Sandbox — isolated, ephemeral scan execution',
            'Stripe — subscription billing',
            'Resend — weekly digest email delivery',
            'Vitest — three test suites covering the detection pipeline',
          ],
          highlights: [
            "Hybrid detection pipeline: deterministic scanners catch pattern-matchable issues, a custom LLM lane purpose-built for payment/auth semantics catches what pattern rules structurally can't — like a database rule that never checks who's asking, or a checkout route that trusts a client-supplied price",
            "Every scan runs inside a fresh, ephemeral Vercel Sandbox instance — isolating execution of static analysis against a third party's real repository was a hard requirement, not an afterthought",
            'GitHub App integration with direct auto-fix pull requests, not just a findings report',
            'Cron-scheduled weekly-scan and weekly-digest jobs run automatically without user action',
          ],
          status:
            'Fully built with real detection logic and a working demo dashboard — the screenshot on this page is the actual product UI, not a mockup. Not yet deployed to a public domain.',
        }),
      },
      hu: {
        summary:
          'Heti, közérthető biztonsági és üzletilogika-auditok azoknak, akik AI-eszközzel gyorsan szállítottak, és most valós felhasználóik vannak — átvizsgálja a kódbázist, kiszűri a hitelesítést, fizetést és ügyféladatot érintő valós kockázatokat, és javításra kész promptot ad vissza.',
        detail: caseStudy('hu', {
          overview: [
            'Az egy- vagy kétfős csapatok, akik AI-eszközzel gyorsan szállítottak, mára valós felhasználókkal rendelkeznek — és olyan valós kockázatokkal, amiket nem látnak, mert a csapatban senki nem biztonsági mérnök, a nyers scanner-kimenet (több száz általános SAST-figyelmeztetés) pedig olvashatatlan zaj, amit senki nem fog átnézni.',
            'A Maturely egy hibrid detektálási pipeline-t futtat — determinisztikus szkennerek plusz egy kifejezetten fizetési és hitelesítési logikára épített egyedi LLM-réteg —, és minden találatot közérthető leírássá alakít, másolásra kész javítási prompttal. GitHub App-on keresztül kapcsolódik, és a javítást közvetlenül pull requestként is meg tudja nyitni.',
          ],
          features: [
            'Heti automatikus biztonsági és üzletilogika-vizsgálat egy kapcsolt GitHub repón',
            'A találatok prioritási sorba rendezve terület szerint: fizetés, hitelesítés, ügyféladat, kódminőség',
            'Minden találat közérthetően elmagyarázva — mi a kockázat és miért számít',
            'Másolásra kész, egy kódoló ügynöknek méretezett javítási prompt találatonként',
            'Egykattintásos „megnyitás pull requestként” automatikus javítási folyamat a GitHub App-on keresztül',
            'Heti összefoglaló e-mail az új és megoldott találatokról',
            'Biztonsági egészségpontszám heti trendkövetéssel',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres',
            'NextAuth v5 — GitHub OAuth plusz GitHub App telepítési folyamat',
            'Semgrep + ESLint — statikus elemzési réteg',
            'Egyedi LLM-detektálási réteg (AI SDK: Anthropic, Google, OpenAI) — szemantikus fizetési/hitelesítési kockázatfelismerés',
            'Vercel Sandbox — elszigetelt, ideiglenes vizsgálat-futtatás',
            'Stripe — előfizetési számlázás',
            'Resend — heti összefoglaló e-mail kézbesítés',
            'Vitest — három tesztcsomag fedi le a detektálási pipeline-t',
          ],
          highlights: [
            'Hibrid detektálási pipeline: a determinisztikus szkennerek elkapják a mintaillesztéssel felismerhető problémákat, egy kifejezetten fizetési/hitelesítési szemantikára épített egyedi LLM-réteg pedig elkapja, amit a mintaillesztés strukturálisan nem tud — például egy adatbázis-szabályt, ami sosem ellenőrzi, ki kérdez, vagy egy fizetési útvonalat, ami megbízik egy kliens által küldött árban',
            'Minden vizsgálat egy friss, ideiglenes Vercel Sandbox példányban fut — egy harmadik fél valódi repóján végzett statikus elemzés elkülönítése alapkövetelmény volt, nem utólagos ötlet',
            'GitHub App integráció közvetlen automatikus javítási pull requestekkel, nem csak egy találati jelentéssel',
            'Cron-ütemezett heti vizsgálati és összefoglaló feladatok automatikusan futnak, felhasználói beavatkozás nélkül',
          ],
          status:
            'Teljesen kiépítve, valódi detektálási logikával és működő demo dashboarddal — az oldalon látható képernyőkép a valódi terméket mutatja, nem makett. Nyilvános domainen még nincs elindítva.',
        }),
      },
    },
    {
      index: '05',
      title: 'Pricing Audit',
      slug: 'pricing-audit',
      techTags: ['Next.js', 'Drizzle', 'Stripe', 'GitHub App'],
      screenshot: 'pricing-audit.png',
      screenshotAlt: 'Pricing Audit landing page showing a failed pricing-enforcement scan',
      isCoreSpecialism: true,
      featured: false,
      en: {
        summary:
          "Audits a codebase for gaps between what a SaaS advertises in its pricing tiers and what's actually enforced in code, then proposes the missing checks and provisions the matching Stripe catalog.",
        detail: caseStudy('en', {
          overview: [
            'A pricing page is a promise — "Growth tier includes 3 projects" — and nothing automatically checks that the code actually enforces it. That gap is usually invisible until a customer notices it first, either by exploiting a limit that was never enforced, or by hitting a limit the marketing page never mentioned.',
            "Pricing Audit connects a read-only GitHub repo and a restricted-scope Stripe key, then traces every advertised tier and limit to its real call site in the code. Where enforcement is missing or wrong, it proposes what to build and — distinctively — can provision the matching Stripe product/price catalog directly.",
          ],
          features: [
            'Connects a read-only GitHub repo and a restricted-scope Stripe key',
            'Scans the codebase and traces every advertised pricing tier/limit to its real enforcement call site',
            'Flags exactly where enforcement is missing, wrong, or merely documented but not enforced',
            "Proposes new pricing logic from scratch when none exists yet, cited to real code",
            'Provisions the matching Stripe product/price catalog directly from audit results',
            'Generates a paste-ready implementation prompt for a coding agent',
            'Runs as a GitHub Action for CI drift checks on every pull request',
            'Sample report available without connecting a repo, to see the output format first',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Drizzle ORM + Postgres',
            'better-auth — accounts',
            'Stripe — catalog provisioning and billing',
            'GitHub App + Octokit — repo access and PR/Action integration',
            'Inngest — background job orchestration for longer audits',
            'AI SDK (Anthropic via Vercel AI Gateway) — code-to-pricing-claim reasoning',
            'ncc — bundles the GitHub Action distribution',
            'Vitest — unit and fixture-based audit tests',
          ],
          highlights: [
            'Traces marketing-copy pricing claims to real enforcement call sites scattered across API routes, middleware and database constraints — a semantic code-to-claim mapping problem, not a keyword search',
            "Direct Stripe catalog provisioning from audit results — the output is a working setup, not just a text report",
            'Dual distribution: web app for one-off audits, standalone GitHub Action for continuous CI drift checks',
            'A 70KB+ running engineering decisions log (DECISIONS.md) documents every non-obvious architecture choice as the project grew',
          ],
          status: 'Actively developed — 23 commits, most recent within the last week. Hosted on Vercel, not yet on a public custom domain.',
        }),
      },
      hu: {
        summary:
          'Átvizsgálja a kódbázist, hogy a hirdetett árazási csomagok valóban érvényesülnek-e a kódban, majd javasolja a hiányzó ellenőrzéseket, és felállítja a hozzá illő Stripe-katalógust.',
        detail: caseStudy('hu', {
          overview: [
            'Egy árazási oldal egy ígéret — „a Growth csomag 3 projektet tartalmaz” —, és semmi nem ellenőrzi automatikusan, hogy a kód valóban betartatja-e ezt. Ez a rés általában addig láthatatlan, amíg egy ügyfél észre nem veszi — vagy kihasznál egy sosem érvényesített korlátot, vagy belefut egy olyan korlátba, amit a marketingoldal sosem említett.',
            'A Pricing Audit egy csak olvasható GitHub repót és egy korlátozott jogkörű Stripe kulcsot köt össze, majd minden hirdetett csomagot és korlátot visszavezet a kódban lévő valódi hívási pontig. Ahol az érvényesítés hiányzik vagy hibás, javasolja, mit kellene megépíteni, és — ami megkülönbözteti — közvetlenül fel is tudja állítani a hozzá illő Stripe termék-/árkatalógust.',
          ],
          features: [
            'Csak olvasható GitHub repót és korlátozott jogkörű Stripe kulcsot köt össze',
            'Átvizsgálja a kódbázist, és minden hirdetett árazási csomagot/korlátot visszavezet a valódi érvényesítési hívási pontig',
            'Pontosan megjelöli, hol hiányzik, hibás, vagy csak dokumentálva van, de nincs betartatva az érvényesítés',
            'Ha még nincs árazási logika, a nulláról javasol egyet, valódi kódhoz kötve',
            'Közvetlenül felállítja a hozzá illő Stripe termék-/árkatalógust az audit eredményeiből',
            'Beillesztésre kész implementációs promptot generál egy kódoló ügynöknek',
            'GitHub Actionként fut CI drift-ellenőrzésekhez minden pull requesten',
            'Minta jelentés elérhető repó csatlakoztatása nélkül, hogy előre látható legyen a kimenet formátuma',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Drizzle ORM + Postgres',
            'better-auth — fiókok',
            'Stripe — katalógus felállítás és számlázás',
            'GitHub App + Octokit — repó-hozzáférés és PR/Action integráció',
            'Inngest — háttérfeladat-szervezés a hosszabb auditokhoz',
            'AI SDK (Anthropic, Vercel AI Gatewayen keresztül) — kód-árazás állítás következtetés',
            'ncc — a GitHub Action terjesztését csomagolja',
            'Vitest — egység- és fixture-alapú audit tesztek',
          ],
          highlights: [
            'A marketingszövegben tett árazási állításokat visszavezeti az API route-okban, middleware-ekben és adatbázis-megkötésekben szétszórt valódi érvényesítési hívási pontokig — nem kulcsszókeresés, hanem szemantikus kód-állítás megfeleltetési probléma',
            'Közvetlen Stripe-katalógus felállítás az audit eredményeiből — a kimenet egy működő beállítás, nem csak egy szöveges jelentés',
            'Kettős terjesztés: webalkalmazás egyszeri auditokhoz, önálló GitHub Action folyamatos CI drift-ellenőrzésekhez',
            'Egy 70KB feletti, futó mérnöki döntési napló (DECISIONS.md) dokumentálja minden nem magától értetődő architekturális döntést, ahogy a projekt nőtt',
          ],
          status: 'Aktív fejlesztés alatt — 23 commit, a legutóbbi az elmúlt héten belül. Vercelen hosztolva, nyilvános egyedi domainen még nem érhető el.',
        }),
      },
    },
    {
      index: '06',
      title: 'Walkure RP',
      slug: 'walkure-rp',
      techTags: ['Next.js', 'Payload CMS', 'MongoDB', 'SimplePay'],
      screenshot: 'walkure-rp.png',
      screenshotAlt: 'Walkure RP streamers page listing partnered content creators',
      isCoreSpecialism: false,
      featured: false,
      en: {
        summary:
          'Full commerce and community platform for an online roleplay server — Payload-driven shop and billing, Discord-gated accounts, role-based staff applications, and scheduled invoicing through Hungarian e-invoicing and OTP SimplePay. No longer running.',
        detail: caseStudy('en', {
          overview: [
            'An online roleplay community needed the operational backbone of a real business, not just a game server config — accounts, payments, staff management and recurring billing all had to work like production software.',
            'The platform runs on Payload CMS with MongoDB: a shop for in-game goods with real checkout, Discord-gated customer accounts, and a role-based application system for staff and whitelist requests with per-user access control. Scheduled jobs generate Hungarian e-invoices and process recurring billing through OTP SimplePay automatically, run under PM2 alongside the web app.',
          ],
          features: [
            'In-game goods shop with real checkout and order history',
            'Discord OAuth-gated customer accounts, using the same identity members already have on the server',
            'Role-based staff application and whitelist request system with per-user access control',
            'Partnered streamers directory pulling live creator info',
            'Automated recurring billing and e-invoice generation — no manual bookkeeping',
            'Public rules/policy and FAQ pages, plus a downloads/onboarding walkthrough for new players',
          ],
          technologies: [
            'Next.js 15.2 (App Router), React 19',
            'Payload CMS 3 on MongoDB',
            'payload-authjs — NextAuth-style authentication bridged into Payload, gated by Discord OAuth',
            'OTP SimplePay (simplepay-js-sdk) — Hungarian payment gateway integration for recurring billing',
            'szamlazz.ts — Hungarian e-invoicing, generated on a schedule',
            'croner — cron-style job scheduling inside the Node process',
            'PM2 — process supervision for the web app and scheduled jobs in production',
            'Radix UI — accessible UI primitives',
          ],
          highlights: [
            'Role-based access control for staff applications: different application types, review states and per-user permissions, not a single flat form',
            'Scheduled jobs (generate-invoices.ts, update-pass-expirations.ts) run under PM2 and generated dozens of real invoices in production — verified directly, not just claimed',
            "OTP SimplePay integration — a Hungarian payment gateway with its own request-signing scheme, distinct from Stripe/PayPal-style integrations",
            "Entire customer-facing app gated behind Discord OAuth, tying platform identity directly to the community's existing Discord presence",
          ],
          status:
            'The community and server are no longer running. 81 commits, evidenced by dozens of real generated invoices in production — the commerce and billing engineering stands on its own regardless of the game context.',
        }),
      },
      hu: {
        summary:
          'Teljes kereskedelmi és közösségi platform egy online szerepjáték-szerverhez — Payload-alapú shop és számlázás, Discord-hitelesítésű fiókok, szerepkör-alapú stábjelentkezések, valamint ütemezett számlázás magyar e-számlázással és OTP SimplePay-jel. Már nem üzemel.',
        detail: caseStudy('hu', {
          overview: [
            'Egy online szerepjáték-közösségnek egy valódi vállalkozás működési háttere kellett, nem csupán egy szerverkonfiguráció — a fiókoknak, fizetéseknek, stábkezelésnek és ismétlődő számlázásnak úgy kellett működnie, mint egy éles szoftvernek.',
            'A platform Payload CMS-re épül MongoDB-vel: valódi fizetési folyamattal rendelkező shop az in-game termékekhez, Discord-hitelesítésű ügyfélfiókok, valamint szerepkör-alapú jelentkezési rendszer a stáb- és whitelist-kérelmekhez, felhasználónkénti jogosultságkezeléssel. Ütemezett feladatok automatikusan generálnak magyar e-számlákat, és az OTP SimplePay-en keresztül dolgozzák fel az ismétlődő számlázást, PM2 alatt futva a webalkalmazás mellett.',
          ],
          features: [
            'In-game termékbolt valódi fizetési folyamattal és rendeléselőzményekkel',
            'Discord OAuth-hitelesítésű ügyfélfiókok, a szerveren már meglévő azonosítót használva',
            'Szerepkör-alapú stábjelentkezési és whitelist-kérelmi rendszer felhasználónkénti jogosultságkezeléssel',
            'Partner streamerek jegyzéke élő alkotói adatokkal',
            'Automatikus ismétlődő számlázás és e-számla-generálás — kézi könyvelés nélkül',
            'Nyilvános szabályzat- és GYIK-oldalak, valamint letöltési/onboarding útmutató új játékosoknak',
          ],
          technologies: [
            'Next.js 15.2 (App Router), React 19',
            'Payload CMS 3 MongoDB-vel',
            'payload-authjs — NextAuth-stílusú hitelesítés a Payloadba hidalva, Discord OAuth mögé zárva',
            'OTP SimplePay (simplepay-js-sdk) — magyar fizetési átjáró integráció az ismétlődő számlázáshoz',
            'szamlazz.ts — magyar e-számlázás, ütemezetten generálva',
            'croner — cron-stílusú feladatütemezés a Node-folyamaton belül',
            'PM2 — folyamatfelügyelet a webalkalmazáshoz és az ütemezett feladatokhoz éles környezetben',
            'Radix UI — akadálymentes UI primitívek',
          ],
          highlights: [
            'Szerepkör-alapú hozzáférés-vezérlés a stábjelentkezésekhez: különböző jelentkezéstípusok, elbírálási állapotok és felhasználónkénti jogosultságok, nem egyetlen egyszerű űrlap',
            'Az ütemezett feladatok (generate-invoices.ts, update-pass-expirations.ts) PM2 alatt futnak, és éles környezetben több tucat valódi számlát generáltak — közvetlenül ellenőrizve, nem csak állítva',
            'OTP SimplePay integráció — egy magyar fizetési átjáró saját kéréssaláírási sémával, ami eltér a Stripe-/PayPal-stílusú integrációktól',
            'A teljes ügyfél-alkalmazás Discord OAuth mögé van zárva, a platformidentitást közvetlenül a közösség meglévő Discord-jelenlétéhez kötve',
          ],
          status:
            'A közösség és a szerver már nem üzemel. 81 commit, amit éles környezetben generált, valódi számlák tucatjai igazolnak — a mögötte álló kereskedelmi és számlázási munka a játékkontextustól függetlenül is megállja a helyét.',
        }),
      },
    },
    {
      index: '07',
      title: 'Verita',
      slug: 'verita',
      techTags: ['Next.js', 'Strapi', 'WebGL'],
      screenshot: 'verita.png',
      screenshotAlt: 'Verita homepage with an animated rotating service tagline',
      isCoreSpecialism: false,
      featured: false,
      en: {
        summary:
          'Delivered brand site for a software development and UX/UI consulting studio — a minimal, animated single-page presence built to make one impression well. Live at veritavc.com.',
        detail: caseStudy('en', {
          overview: [
            'A consulting studio selling software development and UX/UI design needed a site that felt as considered as the work it sells — restraint was the actual brief.',
            "The result is a single page: a wordmark, a WebGL dot-grid background, and a rotating tagline that cycles through the studio's services one at a time instead of listing them all at once. Content is pulled from a headless Strapi backend so the copy can change without touching the frontend.",
          ],
          features: [
            'Single-page brand site: wordmark, animated background, rotating service tagline',
            'Services cycle one at a time (e.g. "Software Development", "UX/UI Design") instead of a static list',
            'Contact call-to-action, no other navigation — deliberately minimal',
            'Content editable through a headless CMS without touching frontend code',
          ],
          technologies: [
            'Next.js 15.1 (App Router), React 19',
            'Strapi 5 (SQLite) — headless CMS backend',
            '@strapi/blocks-react-renderer — renders Strapi block content on the frontend',
            'ogl — lightweight WebGL library for the animated dot-grid background, chosen over three.js for bundle size',
            'Tailwind CSS',
          ],
          highlights: [
            'Deliberately minimal: a single page with no routing, built to make one impression well rather than present a full site',
            'WebGL background implemented with ogl directly rather than three.js — a bundle-size-conscious choice for a page that lives or dies on first impression and load speed',
            'Fully CMS-driven copy through Strapi, so the rotating tagline list and copy can change without a redeploy',
          ],
          status: 'Delivered and live at veritavc.com.',
        }),
      },
      hu: {
        summary:
          'Kész márkaoldal egy szoftverfejlesztési és UX/UI tanácsadó stúdiónak — minimalista, animált egyoldalas jelenlét, ami egyetlen benyomást akar jól átadni. Élesben: veritavc.com.',
        detail: caseStudy('hu', {
          overview: [
            'Egy szoftverfejlesztést és UX/UI tervezést értékesítő tanácsadó stúdiónak olyan oldalra volt szüksége, ami annyira átgondolt, mint amilyen munkát elad — a visszafogottság volt maga a feladat.',
            'Az eredmény egyetlen oldal: egy embléma, egy WebGL pontrács-háttér, és egy forgó szlogen, ami a stúdió szolgáltatásait egyesével jeleníti meg ahelyett, hogy mindet egyszerre felsorolná. A tartalom egy headless Strapi backendből érkezik, így a szöveg a frontend módosítása nélkül is változtatható.',
          ],
          features: [
            'Egyoldalas márkaoldal: embléma, animált háttér, forgó szolgáltatás-szlogen',
            'A szolgáltatások egyesével váltják egymást (pl. „Software Development”, „UX/UI Design”) statikus lista helyett',
            'Kapcsolatfelvételi call-to-action, más navigáció nélkül — szándékosan minimalista',
            'A tartalom egy headless CMS-en keresztül szerkeszthető, a frontend érintése nélkül',
          ],
          technologies: [
            'Next.js 15.1 (App Router), React 19',
            'Strapi 5 (SQLite) — headless CMS backend',
            '@strapi/blocks-react-renderer — a Strapi blokktartalmat jeleníti meg a frontenden',
            'ogl — könnyű WebGL könyvtár az animált pontrács-háttérhez, three.js helyett a csomagméret miatt választva',
            'Tailwind CSS',
          ],
          highlights: [
            'Szándékosan minimalista: egyetlen oldal routing nélkül, ami egyetlen benyomást akar jól átadni ahelyett, hogy egy teljes oldalt mutatna be',
            'A WebGL-háttér közvetlenül ogl-lel készült, nem three.js-sel — csomagméret-tudatos döntés egy olyan oldalhoz, ami az első benyomáson és a betöltési sebességen áll vagy bukik',
            'Teljesen CMS-vezérelt tartalom Strapin keresztül, így a forgó szlogenlista és a szöveg újratelepítés nélkül is változtatható',
          ],
          status: 'Elkészült és élesben fut a veritavc.com oldalon.',
        }),
      },
    },
    {
      index: '08',
      title: 'Fairdue',
      slug: 'fairdue',
      techTags: ['Next.js', 'Prisma', 'NextAuth', 'next-intl'],
      screenshot: null,
      screenshotLabel: 'screenshot — subscription splitting',
      screenshotStyle: 'light' as const,
      isCoreSpecialism: false,
      featured: false,
      en: {
        summary:
          'Own product — split shared subscriptions and bills with friends and family, invite by link, and settle up without spreadsheet diplomacy. Not yet live.',
        detail: caseStudy('en', {
          overview: [
            'Splitting a shared Netflix or Spotify bill with friends or family always ends the same way: someone tracks it in a spreadsheet, and someone else has to be chased down every month. Nobody wants to be either person.',
            "Fairdue replaces that with an invite-by-link group, automatic cost splitting per subscription, and a settle-up flow that keeps the running balance visible instead of buried in a chat thread. It's built as a real product from the start, including i18n, so it works in Hungarian and English out of the box.",
          ],
          features: [
            'Create a group and invite people by shareable link, no account required to view an invite',
            'Add shared subscriptions or bills and split cost automatically across group members',
            'Running balance view — who owes whom, kept visible instead of buried in chat',
            'Settle-up flow to close out a balance',
            'Full English/Hungarian localization from day one',
            'Email notifications for new charges and settle-up requests',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres',
            'NextAuth v5 — accounts',
            'next-intl — locale-aware routing and copy',
            'Resend — notification email',
            'Phosphor Icons, Tailwind CSS',
          ],
          highlights: [
            'Per-subscription cost-splitting logic across a group whose members can join at different times — the actual hard part is computing a fair running balance, not just dividing a number by N',
            'i18n built in from the start via next-intl rather than retrofitted, with fully locale-aware routing',
            'Marketing site includes structured data (JSON-LD) and a comparison table against the "spreadsheet" status quo',
          ],
          status: 'Personal product, pre-launch. 12 commits.',
        }),
      },
      hu: {
        summary:
          'Saját termék — közösen fizetett előfizetések és számlák megosztása barátokkal, családdal, meghívás linkkel, rendezés táblázatos diplomácia nélkül. Még nem él.',
        detail: caseStudy('hu', {
          overview: [
            'Egy közös Netflix- vagy Spotify-számla szétosztása barátokkal vagy családdal mindig ugyanúgy végződik: valaki egy táblázatban vezeti, valakit pedig havonta rá kell szólni. Egyik szerepet sem szeretné senki.',
            'A Fairdue ezt egy meghívás-linkes csoporttal, előfizetésenkénti automatikus költségmegosztással és egy rendezési folyamattal váltja ki, ami láthatóvá teszi az aktuális egyenleget ahelyett, hogy egy chat-szálban tűnne el. Kezdettől fogva valódi termékként épült, i18n-nel együtt, így magyarul és angolul is működik dobozból.',
          ],
          features: [
            'Csoport létrehozása és meghívás megosztható linkkel, fiók nélkül megtekinthető meghívó',
            'Közös előfizetések vagy számlák hozzáadása, automatikus költségmegosztással a csoporttagok között',
            'Aktuális egyenleg nézet — ki kinek tartozik, láthatóan, nem egy chatben elveszve',
            'Rendezési folyamat egy egyenleg lezárásához',
            'Teljes angol/magyar lokalizáció az első naptól',
            'E-mail értesítések új terhelésekről és rendezési kérésekről',
          ],
          technologies: [
            'Next.js 16 (App Router), React 19',
            'Prisma 7 + Postgres',
            'NextAuth v5 — fiókok',
            'next-intl — nyelvtudatos routing és szöveg',
            'Resend — értesítési e-mail',
            'Phosphor Icons, Tailwind CSS',
          ],
          highlights: [
            'Előfizetésenkénti költségmegosztási logika egy olyan csoportban, ahol a tagok különböző időpontban csatlakozhatnak — a valódi nehézség egy igazságos, aktuális egyenleg kiszámítása, nem csak egy szám elosztása N-nel',
            'Az i18n kezdettől fogva beépítve, next-intl-lel, nem utólag ráépítve, teljesen nyelvtudatos routinggal',
            'A marketing oldal strukturált adatot (JSON-LD) és egy összehasonlító táblázatot is tartalmaz a „táblázatos” status quóhoz képest',
          ],
          status: 'Saját termék, indulás előtt. 12 commit.',
        }),
      },
    },
  ]

  // Clear the placeholder projects seeded by earlier runs before inserting the real set.
  const all = await payload.find({ collection: 'projects', limit: 100 })
  for (const doc of all.docs) {
    await payload.delete({ collection: 'projects', id: doc.id })
  }

  for (const p of projects) {
    let mediaId: number | undefined
    if (p.screenshot) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: p.screenshotAlt! },
        filePath: path.join(assetsDir, p.screenshot),
      })
      mediaId = media.id
    }

    const baseData = {
      index: p.index,
      title: p.title,
      slug: p.slug,
      techTags: p.techTags,
      screenshot: mediaId,
      screenshotLabel: p.screenshotLabel ?? null,
      screenshotStyle: p.screenshotStyle ?? null,
      isCoreSpecialism: p.isCoreSpecialism,
      featured: p.featured,
      summary: p.en.summary,
      detailContent: lexicalDoc(p.en.detail),
    }

    const created = await payload.create({ collection: 'projects', locale: 'en', data: baseData })
    await payload.update({
      collection: 'projects',
      id: created.id,
      locale: 'hu',
      data: { summary: p.hu.summary, detailContent: lexicalDoc(p.hu.detail) },
    })
  }

  console.log('Seeded projects')
}

async function run() {
  await seedSiteSettings()
  await seedAboutContent()
  await seedCapabilities()
  await seedUiText()
  await seedProjects()
  console.log('Seed complete.')
}

try {
  await run()
} catch (err) {
  console.error(err)
  process.exit(1)
}
