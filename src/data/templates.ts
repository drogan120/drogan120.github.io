/**
 * Single source of truth for the templates (portfolio skins + standalone views).
 *
 * This mirrors src/data/schemes.ts for the same reason: adding a template used
 * to mean editing six hardcoded lists — the provider's union type, the switch
 * in views/default, the settings picker, the command palette, the `?template=`
 * whitelist, and the terminal's `--view` completions. Missing one failed
 * quietly and inconsistently (e.g. a template reachable by URL but absent from
 * the picker, or listed in the palette but rendering as minimal).
 *
 * Adding a template is now:
 *   1. append an entry here
 *   2. create src/components/views/default/templates/<value>/index.tsx
 *   3. add the case to views/default/index.tsx
 *
 * `kind` separates the default-view skins from the standalone views, which
 * bypass the template switcher entirely and are rendered further up the tree.
 */
export const TEMPLATES = [
  { value: "aurora", label: "Aurora", kind: "skin" },
  { value: "minimal", label: "Minimal", kind: "skin" },
  { value: "playful", label: "Playful", kind: "skin" },
  { value: "classic", label: "Classic", kind: "skin" },
  { value: "brutalist", label: "Brutalist", kind: "skin" },
  { value: "fashion", label: "Fashion", kind: "skin" },
  { value: "pastel", label: "Pastel", kind: "skin" },
  { value: "glass", label: "Glass", kind: "skin" },
  { value: "anime", label: "Anime", kind: "skin" },
  { value: "neon", label: "Neon", kind: "skin" },
  { value: "apiDocs", label: "API Docs", kind: "view" },
  { value: "terminal", label: "Terminal", kind: "view" },
] as const;

export type Template = (typeof TEMPLATES)[number]["value"];

/** Just the identifiers, for URL validation and terminal completions. */
export const TEMPLATE_NAMES = TEMPLATES.map(
  (template) => template.value
) as readonly Template[];

/**
 * Aurora is the default: it is the most complete skin, and the one the rest of
 * the site's motion and colour work was tuned against.
 */
export const DEFAULT_TEMPLATE: Template = "aurora";
