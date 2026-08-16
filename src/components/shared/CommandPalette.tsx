"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useI18n, languages } from "@/i18n";
import type { Language } from "@/i18n";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import { COLOR_SCHEMES } from "@/data/schemes";
import { useTemplate } from "@/components/providers/TemplateProvider";
import type { Template } from "@/data/templates";
import { TEMPLATES, DEFAULT_TEMPLATE } from "@/data/templates";
import { blogPosts, languageLabel } from "@/data/blogIndex";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: string;
  /** Extra words matched by the search box but not shown. */
  keywords?: string;
  active?: boolean;
  run: () => void;
};

type PaletteContextValue = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

const PaletteContext = createContext<PaletteContextValue>({
  open: () => {},
  close: () => {},
  toggle: () => {},
  isOpen: false,
});

export function useCommandPalette() {
  return useContext(PaletteContext);
}

/**
 * Only the default-view skins. apiDocs and terminal live in VIEWS instead,
 * since picking them swaps the whole page rather than restyling it.
 */
const SKINS = TEMPLATES.filter((tpl) => tpl.kind === "skin");

const VIEWS: { value: Template; label: string; icon: string }[] = [
  // "Default" points at whatever the default skin currently is, so this entry
  // never goes stale when DEFAULT_TEMPLATE changes.
  { value: DEFAULT_TEMPLATE, label: "Default", icon: "🖼️" },
  { value: "apiDocs", label: "API Docs", icon: "📘" },
  { value: "terminal", label: "Terminal", icon: "⌨️" },
];

const SCHEMES = COLOR_SCHEMES;

const SECTIONS = [
  { hash: "#about", key: "about", icon: "👋" },
  { hash: "#skills", key: "skills", icon: "🛠️" },
  { hash: "#experience", key: "experience", icon: "💼" },
  { hash: "#gallery", key: "gallery", icon: "📱" },
  { hash: "#projects", key: "projects", icon: "📦" },
  { hash: "#contact", key: "contact", icon: "✉️" },
] as const;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { t, lang, setLang } = useI18n();
  const { template, setTemplate } = useTemplate();
  const { theme, setTheme } = useTheme();
  const { scheme, setScheme } = useColorScheme();

  const [query, setQuery] = useState("");
  const [rawCursor, setRawCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const g = t.palette.groups;

  const commands = useMemo<Command[]>(() => {
    const run = (fn: () => void) => () => {
      fn();
      onClose();
    };

    const isDefaultView = !["apiDocs", "terminal"].includes(template);

    return [
      // Navigate
      {
        id: "nav-home",
        group: g.navigate,
        label: "Home",
        icon: "🏠",
        keywords: "index beranda top",
        run: run(() => router.push("/")),
      },
      {
        id: "nav-blog",
        group: g.navigate,
        label: t.default.blog.viewAll,
        icon: "📝",
        keywords: "blog posts artikel tulisan",
        run: run(() => router.push("/blog")),
      },
      ...SECTIONS.map((s) => ({
        id: `nav-${s.key}`,
        group: g.navigate,
        label: t.default.nav[s.key],
        icon: s.icon,
        keywords: s.key,
        run: run(() => {
          document
            .querySelector(s.hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }),
      })),

      // View mode
      ...VIEWS.map((v) => ({
        id: `view-${v.label}`,
        group: g.views,
        label: v.label,
        icon: v.icon,
        keywords: `view mode ${v.value}`,
        active:
          v.value === DEFAULT_TEMPLATE ? isDefaultView : template === v.value,
        run: run(() => setTemplate(v.value)),
      })),

      // Templates
      ...SKINS.map((tpl) => ({
        id: `tpl-${tpl.value}`,
        group: g.templates,
        label: tpl.label,
        icon: "🎨",
        keywords: `template theme style ${tpl.value}`,
        active: template === tpl.value,
        run: run(() => setTemplate(tpl.value)),
      })),

      // Theme
      ...(["dark", "light"] as const).map((mode) => ({
        id: `theme-${mode}`,
        group: g.theme,
        label: mode === "dark" ? t.theme.dark : t.theme.light,
        icon: mode === "dark" ? "🌙" : "☀️",
        keywords: `theme mode ${mode} gelap terang`,
        active: theme === mode,
        run: run(() => setTheme(mode)),
      })),

      // Color scheme
      ...SCHEMES.map((s) => ({
        id: `scheme-${s.value}`,
        group: g.color,
        label: s.label,
        icon: "🎨",
        keywords: `color scheme palette warna ${s.value}`,
        active: scheme === s.value,
        run: run(() => setScheme(s.value)),
      })),

      // Language
      ...(Object.keys(languages) as Language[]).map((key) => ({
        id: `lang-${key}`,
        group: g.language,
        label: languages[key].name,
        hint: languages[key].label,
        icon: "🌐",
        keywords: `language bahasa ${key} ${languages[key].label}`,
        active: lang === key,
        run: run(() => setLang(key)),
      })),

      // Blog posts
      ...blogPosts.map((post) => ({
        id: `post-${post.id}`,
        group: g.blog,
        label: post.title,
        hint: `${post.date} · ${languageLabel(post.language)}`,
        icon: "📄",
        keywords: `${post.category} ${post.tags.join(" ")} ${post.excerpt}`,
        run: run(() => router.push(`/blog/${post.id}`)),
      })),

      // Projects
      ...t.default.projects.items.map((project, i) => ({
        id: `project-${i}`,
        group: g.projects,
        label: project.title,
        hint: project.tags.join(" · "),
        icon: project.icon ?? "📦",
        keywords: `${project.description} ${project.tags.join(" ")}`,
        run: run(() => {
          if (project.repo) window.open(project.repo, "_blank", "noopener");
        }),
      })),
    ];
  }, [
    g,
    t,
    lang,
    setLang,
    template,
    setTemplate,
    theme,
    setTheme,
    scheme,
    setScheme,
    router,
    onClose,
  ]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return commands;
    const terms = q.split(/\s+/);
    return commands.filter((cmd) => {
      const haystack = normalize(
        `${cmd.label} ${cmd.group} ${cmd.hint ?? ""} ${cmd.keywords ?? ""}`
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [commands, query]);

  // Keep the highlight in range without an effect: when the query narrows the
  // list, the stored cursor may point past the end.
  const cursor = Math.min(rawCursor, Math.max(0, results.length - 1));

  /**
   * Spotlight-style inline completion: if the highlighted result starts with
   * what has been typed, the remainder is shown as ghost text and Tab accepts
   * it. Only a true prefix match completes, otherwise the ghost would contradict
   * the visible text.
   */
  const suggestion = results[cursor]?.label ?? "";
  const completion =
    query.length > 0 &&
    suggestion.length > query.length &&
    normalize(suggestion).startsWith(normalize(query))
      ? suggestion.slice(query.length)
      : "";

  const acceptCompletion = useCallback(() => {
    if (!completion) return false;
    setQuery(suggestion);
    setRawCursor(0);
    return true;
  }, [completion, suggestion]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const move = useCallback(
    (delta: number) => {
      setRawCursor((current) => {
        if (results.length === 0) return 0;
        const from = Math.min(current, results.length - 1);
        return (from + delta + results.length) % results.length;
      });
    },
    [results.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        // Tab completes the ghost text instead of leaving the input.
        e.preventDefault();
        if (!acceptCompletion()) move(e.shiftKey ? -1 : 1);
        return;
      }
      if (e.key === "ArrowRight") {
        // Only complete when the caret sits at the very end, so ArrowRight can
        // still be used to move through the text normally.
        const el = inputRef.current;
        const atEnd =
          el && el.selectionStart === query.length && el.selectionStart === el.selectionEnd;
        if (atEnd && completion) {
          e.preventDefault();
          acceptCompletion();
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        results[cursor]?.run();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [move, onClose, results, cursor, acceptCompletion, completion, query.length]);

  // Scroll the highlighted row into view while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 md:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label={t.palette.open}
    >
      <div
        className="palette-overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="palette-panel relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/50">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span aria-hidden className="shrink-0 text-muted">
            🔍
          </span>

          {/* The ghost layer mirrors the input's font metrics exactly, so the
              suggestion lines up right after the typed text. */}
          <div className="relative min-w-0 flex-1">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre text-sm"
            >
              <span className="invisible">{query}</span>
              <span className="text-muted/60">{completion}</span>
            </div>
            {/* Ring suppressed on purpose: this input is autofocused the whole
                time the palette is open, so a permanent ring would just be
                noise. The caret, placeholder and ghost text mark focus. */}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setRawCursor(0);
              }}
              placeholder={t.palette.placeholder}
              aria-label={t.palette.placeholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="relative w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>

          {completion && (
            <button
              type="button"
              onClick={acceptCompletion}
              className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-accent hover:text-accent sm:block"
            >
              TAB
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label={t.palette.hintClose}
            className="shrink-0 rounded-md px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:text-foreground"
          >
            ESC
          </button>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted">
              {t.palette.empty}
            </p>
          )}

          {results.map((cmd, i) => {
            const showGroup = cmd.group !== lastGroup;
            lastGroup = cmd.group;
            const active = i === cursor;

            return (
              <div key={cmd.id}>
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
                    {cmd.group}
                  </p>
                )}
                <button
                  type="button"
                  data-active={active}
                  onMouseEnter={() => setRawCursor(i)}
                  onClick={cmd.run}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    active ? "bg-accent/15 text-foreground" : "text-muted"
                  }`}
                >
                  <span aria-hidden className="shrink-0 text-base">
                    {cmd.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {cmd.label}
                    </span>
                    {cmd.hint && (
                      <span className="block truncate font-mono text-[11px] text-muted">
                        {cmd.hint}
                      </span>
                    )}
                  </span>
                  {cmd.active && (
                    <span
                      aria-hidden
                      className="shrink-0 font-mono text-[10px] text-accent"
                    >
                      ●
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center justify-end gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-muted sm:flex">
          <span>↑↓ {t.palette.hintNav}</span>
          <span>tab {t.palette.hintComplete}</span>
          <span>↵ {t.palette.hintRun}</span>
          <span>esc {t.palette.hintClose}</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Lock background scrolling while the overlay is up.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ open, close, toggle, isOpen }),
    [open, close, toggle, isOpen]
  );

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {isOpen && <Palette onClose={close} />}
    </PaletteContext.Provider>
  );
}
