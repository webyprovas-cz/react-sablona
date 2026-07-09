---
name: ui-ux-design
description: Use whenever building or editing UI in this project — any new page, section, landing page, hero, or component. Encodes the design rules, component conventions, and animation patterns this template follows, so output matches a "max skill" design bar instead of generic defaults. Trigger on requests like "add a section", "build a landing page", "make this look better", "add a hero", "style this component".
---

# UI/UX design rules for this template

Tohle je šablonový projekt pro budoucí klientské weby (malé firmy — kadeřnictví, barbershopy apod.), postavený na **React + Vite + Tailwind CSS v4 + shadcn/ui (Nova preset) + Framer Motion**. Cíl: každý web z téhle šablony má vypadat na úrovni kvalitních SaaS/marketingových webů (viz 21st.dev, Awwwards, Mobbin), ne jako výchozí Bootstrap/Tailwind šablona.

## Než začneš

1. Nepiš CSS "od nuly" — používej Tailwind utility třídy a design tokeny už definované v `src/index.css` (`--background`, `--foreground`, `--primary`, `--muted`, `--radius`, atd.). Nová barva/radius jde vždy nejdřív do `@theme`/`:root`, ne jako natvrdo zapsaná hex hodnota v komponentě.
2. Než postavíš nový UI prvek, zkontroluj `src/components/ui/` — jestli tam něco podobného (Button, Badge, Card...) už existuje, rozšiř to místo nové komponenty. Chybějící primitivum přidej přes `npx shadcn@latest add <komponenta>` (viz Windows poznámka níže).
3. Pro landing-page bloky (hero, features, pricing, testimonials) se nejdřív podívej na referenci na [21st.dev](https://21st.dev) nebo [Mobbin](https://mobbin.com) pro danou kategorii, než vymýšlíš layout od začátku — cíl je úroveň designu srovnatelná s tím, co tam je, i když se to přepisuje ručně.

## Typografie

- Nadpisy: velký kontrast vůči textu (`text-4xl` až `text-6xl` na hero, `text-2xl`–`text-3xl` na sekce), `font-semibold`, `tracking-tight`.
- Dlouhé nadpisy/popisy vždy s `text-balance` (zabraňuje ošklivému zalomení na jedno slovo na řádku).
- Tělo textu: `text-muted-foreground`, ne plnou `text-foreground` barvu — jinak text vizuálně soutěží s nadpisy.
- Nikdy nepoužívej víc než 2 řezy fontu (heading + sans). Font je nastavený globálně (Geist) přes `@fontsource-variable` — neimportuj další fonty bez důvodu.

## Layout a rytmus

- Sekce mají jednotný vertikální rytmus: `py-24`/`py-32` na velké sekce, `py-16`/`py-20` na menší. Neskákej nahodile mezi hodnotami.
- Obsah centrovaný, s `max-w-3xl` (text-heavy) nebo `max-w-6xl`/`max-w-7xl` (grid layouty), nikdy full-width text.
- Grid/flex s konzistentní mezerou (`gap-6`, `gap-8`) — ne kombinace `margin` a `gap` na stejné úrovni.
- Mobile-first: každá nová sekce se ověřuje i na úzké obrazovce (viz `run` skill / dev server), ne jen na desktopu.

## Barvy

- Používej sémantické tokeny (`bg-primary`, `text-muted-foreground`, `bg-card`, `border-border`), ne libovolné Tailwind barvy jako `bg-blue-500` — porušuje to light/dark theming, který je už nastavený.
- Akcentní barva projektu (`--primary`) se mění per klient v `src/index.css` (`:root` a `.dark` bloky) — neopakuj vlastní barvu v komponentách.
- Kontrast textu na barevném pozadí vždy ověř (WCAG AA, min. 4.5:1 pro běžný text).

## Animace (Framer Motion)

Cíl: jemné, rychlé, "profesionální" animace — ne rušivé efekty.

- Pro animaci sekce při scrollu do viewportu vždy použij existující `src/components/AnimatedSection.tsx`, neduplikuj `whileInView` logiku ručně v každé komponentě.
- Vstupní animace hero/above-the-fold obsahu: `animate` (rovnou při loadu), ne `whileInView` — uživatel to musí vidět animovat se hned.
- Standardní hodnoty v tomhle projektu (drž se jich, ať je vše konzistentní):
  - posun: `y: 20–40px`
  - trvání: `0.5–0.6s`
  - easing: `[0.22, 1, 0.36, 1]` (ease-out-ish, viz `Hero.tsx`)
  - `viewport={{ once: true, amount: 0.2 }}` — animace se spustí jen jednou, ne při každém scrollu tam a zpět
- Sekvence víc prvků v sekci (badge → nadpis → text → tlačítka) animuj přes `staggerChildren` (viz `Hero.tsx` `container`/`item` varianty), ne jako jednu velkou animaci najednou.
- Respektuj `prefers-reduced-motion` — Framer Motion to řeší z většiny samo, ale u vlastních transformací (parallax, velké posuny) přidej `useReducedMotion()` a animaci zjednoduš/vypni.

## Hero sekce (výchozí vzor: `src/components/Hero.tsx`)

Struktura, kterou nová hero sekce má dodržet, pokud klient nechce vyloženě jiný layout:
1. Eyebrow/badge nahoře (kontext, ne generické "Welcome")
2. Jeden silný nadpis (ne dvě věty spojené do jedné)
3. Krátký popisující odstavec (1–2 věty, ne odstavec)
4. Primární CTA (výrazné, `size="lg"`) + volitelně sekundární CTA (`variant="outline"`)
5. Volitelně sociální důkaz (hodnocení, počet klientů, loga) pod CTA

## Přidávání komponent z 21st.dev

`npx shadcn@latest add "https://21st.dev/r/<autor>/<komponenta>"` vyžaduje účet a API klíč na 21st.dev (bez něj CLI vrátí `Authentication required`). Postup, až bude klíč k dispozici:

```
npx shadcn@latest add "https://21st.dev/r/<autor>/<komponenta>" --token <API_KEY>
```

**Windows poznámka:** `npx shadcn@latest init/add` v tomhle prostředí špatně resolvuje `@/*` alias a soubory zapíše do doslovné složky `./@/...` místo `./src/...`. Po každém `add` zkontroluj, jestli nevznikla složka `@` v rootu projektu, a pokud ano, přesuň obsah do `src/` a smaž ji (`components` → `src/components`, `lib` → `src/lib`).

## Checklist před odevzdáním nové sekce/stránky

- [ ] Použité jen sémantické barevné tokeny, žádné natvrdo zapsané hex/Tailwind barvy
- [ ] Nadpis + popis mají `text-balance`
- [ ] Sekce má animaci (`AnimatedSection` nebo vlastní `motion` prvek se stejnými timing hodnotami)
- [ ] Layout funguje na mobilu (ne jen desktop preview)
- [ ] CTA tlačítka používají `Button` komponentu, ne vlastní `<a class="btn">`
- [ ] Žádná nová barva/font nepřidaná bez úpravy `src/index.css` tokenů
