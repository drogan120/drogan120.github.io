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
 *
 * `scheme` is the colour scheme that should be applied automatically when the
 * template is selected. It is only a default: the visitor can still pick any
 * other scheme afterwards, and picking a template again re-applies its own.
 * Standalone views carry no scheme so switching to them leaves the colours
 * untouched.
 */
import type { ColorScheme } from "./schemes";

export const TEMPLATES = [
  { value: "aurora", label: "Aurora", kind: "skin", scheme: "mauve" },
  { value: "minimal", label: "Minimal", kind: "skin", scheme: "slate" },
  { value: "playful", label: "Playful", kind: "skin", scheme: "pastel" },
  { value: "classic", label: "Classic", kind: "skin", scheme: "amber" },
  { value: "brutalist", label: "Brutalist", kind: "skin", scheme: "slate" },
  { value: "fashion", label: "Fashion", kind: "skin", scheme: "sakura" },
  { value: "pastel", label: "Pastel", kind: "skin", scheme: "pastel" },
  { value: "glass", label: "Glass", kind: "skin", scheme: "ocean" },
  { value: "anime", label: "Anime", kind: "skin", scheme: "anime" },
  { value: "neon", label: "Neon", kind: "skin", scheme: "neon" },
  { value: "paper", label: "Paper", kind: "skin", scheme: "paper" },
  { value: "retro", label: "Retro", kind: "skin", scheme: "retro" },
  { value: "pixel", label: "Pixel", kind: "skin", scheme: "pixel" },
  { value: "toon", label: "Toon", kind: "skin", scheme: "toon" },
  { value: "ff7", label: "FF7", kind: "skin", scheme: "ff7" },
  { value: "apiDocs", label: "API Docs", kind: "view" },
  { value: "terminal", label: "Terminal", kind: "view" },
] as const;

export type Template = (typeof TEMPLATES)[number]["value"];

/** Just the identifiers, for URL validation and terminal completions. */
export const TEMPLATE_NAMES = TEMPLATES.map(
  (template) => template.value
) as readonly Template[];

/**
 * The scheme that should accompany a template, or null for standalone views.
 * Used by the template provider to auto-apply colours on template switch.
 */
export function templateScheme(template: Template): ColorScheme | null {
  const entry = TEMPLATES.find((t) => t.value === template);
  return entry && "scheme" in entry ? (entry.scheme as ColorScheme) : null;
}

/**
 * Aurora is the default: it is the most complete skin, and the one the rest of
 * the site's motion and colour work was tuned against.
 */
export const DEFAULT_TEMPLATE: Template = "anime";
