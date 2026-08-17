/**
 * Single source of truth for the colour schemes.
 *
 * Adding a scheme used to mean editing five hardcoded lists (the provider, the
 * URL whitelist, the settings picker, the command palette, and the pre-paint
 * script in the root layout). Missing any one of them failed quietly — the
 * worst case being the layout script, where a stale `scheme-*` class was left
 * on <html> alongside the new one and the winner was decided by rule order in
 * palettes.css rather than by intent.
 *
 * Now there are exactly two steps to add one:
 *   1. append an entry here
 *   2. add the matching `.scheme-<value>.dark` / `.light` blocks in
 *      src/app/themes/palettes.css
 *
 * Every light variant must clear WCAG AA (4.5:1) against its own --card for
 * --muted, --accent, --accent-2, --get, --post and the --json-* tokens.
 */
export const COLOR_SCHEMES = [
  { value: "mauve", label: "Mauve" },
  { value: "pastel", label: "Pastel" },
  { value: "ocean", label: "Ocean" },
  { value: "forest", label: "Forest" },
  { value: "sunset", label: "Sunset" },
  { value: "amber", label: "Amber" },
  { value: "sakura", label: "Sakura" },
  { value: "slate", label: "Slate" },
  { value: "flat", label: "Flat" },
  { value: "anime", label: "Anime" },
  { value: "nihon", label: "Nihon" },
  { value: "neon", label: "Neon" },
  { value: "paper", label: "Paper" },
  { value: "retro", label: "Retro" },
  { value: "pixel", label: "Pixel" },
  { value: "toon", label: "Toon" },
  { value: "ff7", label: "FF7" },
  { value: "broken", label: "Broken" },
  { value: "nusantara", label: "Nusantara" },
] as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[number]["value"];

/** Just the identifiers, for class bookkeeping and URL validation. */
export const SCHEME_NAMES = COLOR_SCHEMES.map(
  (scheme) => scheme.value
) as readonly ColorScheme[];

export const DEFAULT_SCHEME: ColorScheme = "mauve";
