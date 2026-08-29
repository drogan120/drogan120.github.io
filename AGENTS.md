# AGENTS.md — Drogan Portfolio

Guidance for AI coding agents working in this repository.

## Project

Statis personal portfolio (Drogan), **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, deployed as a static site to GitHub Pages.

- Package manager: **pnpm** (do not use npm/yarn).
- Static export to `out/` via `pnpm build` / `pnpm deploy`.
- i18n: English (default), Indonesia, 日本語 via `src/i18n/{en,id,ja}.ts`.

## Commands

- `pnpm lint` — run ESLint (must stay clean).
- `pnpm build` — static build (must succeed before finishing any task).
- `pnpm dev` — local dev server.
- `pnpm deploy` — build + touch `out/.nojekyll`.

Always run `pnpm lint` and `pnpm build` after making changes and verify both pass.

## Code style — REQUIRED

- **Never use unreadable, cryptic, or single-letter variable names** (e.g. `h`, `x`, `cfg`, `t2`). Name variables and functions for their purpose (e.g. `headerTitle`, `currentKana`, `buildOptions`). If you find yourself introducing a terse alias for readability, instead reference the full expression or use a descriptive name.
- No comments unless explicitly asked; prefer self-documenting code via clear names.
- Mirror existing patterns in neighboring files before writing new code.

## React / Next.js constraints

Strict React lint rules are enforced. Known pitfalls and the accepted workarounds:

- `react-hooks/set-state-in-effect` — do **not** call `setState` synchronously in an effect body. To run one-time client-side init (random values / hydration interaction), wrap `setState` in `requestAnimationFrame` inside the effect (see `src/components/games/KanaSpeedGame.tsx` or recall games).
- `react-hooks/refs` — never write to a ref during render.
- `react-hooks/purity` — never call `Math.random()` or other impure code in render scope; generate randomness inside event handlers or effects only.
- Any source of randomness/JS-only value must start as `null`/empty and be filled after mount to keep SSR (static export) HTML stable and avoid hydration mismatches.
- When a key handler must fire reliably on a text input, prefer a `window`-level `keydown` listener registered in an effect (the input `onKeyDown` has proven unreliable here) — see the recall/kanji-recall games.
- LocalStorage persistence: lazy `useState(() => loadStats())` initializer + a save effect guarded by a `mounted` flag.

## Games (Japanese practice)

- `/games` hub lists mini-games; each game is a client component under `src/components/games/` with a static route under `src/app/games/<slug>/page.tsx` (with Metadata + canonical/OG).
- Data lives in:
  - `src/data/kanaWords.ts` — 7196 hiragana vocab words (kana meaning + level); helpers `wordsFor`, `randomWordFor`, `drawWord` (no same-session repeat), `drawWordForLevel`.
  - `src/data/kanjiWords.ts` — 7193 kanji words (kanji + reading + meaning + level); helpers `kanjiWordsForLevel`, `drawKanji` (no-repeat). Auto-generated from `/tmp/opencode/gen_kanji.js`.
- IME romaji→kana conversion in `src/lib/romaji.ts` (`romajiToKana`, `splitKana`).
- Prefer the no-repeat `draw*` helpers so a word already answered in the same session does not reappear.
- i18n: `Dictionary` type is `typeof en` (in `src/i18n/en.ts`); `id.ts` and `ja.ts` must keep the **exact same shape** as `en.ts`. Add new keys to all three files.
