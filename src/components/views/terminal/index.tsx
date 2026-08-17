"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useTemplate } from "@/components/providers/TemplateProvider";
import type { Template } from "@/data/templates";
import { TEMPLATE_NAMES } from "@/data/templates";
import SettingsBar from "@/components/shared/SettingsBar";
import { useCommandPalette } from "@/components/shared/CommandPalette";
import { blogPosts } from "@/data/blogIndex";

type Line = {
  command?: string;
  output?: string;
};


const HISTORY: Record<string, string> = {
  "--about": "Ali — Backend & Android Developer",
  "--skills": "[kotlin, java, django, python, rest_framework, mysql, postgresql, clickhouse, retrofit, room]",
  "--experience": "[2022-present android developer @ stamps indonesia, 2021-present backend developer @ stamps indonesia]",
  "--stats": "[years coding: 5+, projects built: 20+, cups of coffee: infinity]",
  "--achievements": "[best project award, android development certification, open source contributor]",
  "--hobbies": "[gaming, photography, music, reading]",
  "--github": "github.com/drogan120 — 38 repos · 124 stars · 57 followers",
  "--blog": `${blogPosts.length} posts — /blog (latest: ${blogPosts[0].title})`,
  "--projects": "[aplikasi-catatan, portfolio-website, rest-api-basic]",
  "--contact": "github.com/drogan120 · drogan120@gmail.com",
  help: "commands: --about, --skills, --experience, --stats, --achievements, --hobbies, --github, --blog, --projects, --contact, --view <template>, clear, help — press Tab to autocomplete, ↑/↓ for history",
};

/** Everything Tab can complete: plain commands plus `--view <template>`. */
const COMPLETIONS: string[] = [
  ...Object.keys(HISTORY),
  "clear",
  ...TEMPLATE_NAMES.map((tpl) => `--view ${tpl}`),
];

export default function TerminalView() {
  const { setTemplate } = useTemplate();
  const palette = useCommandPalette();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `nearest` keeps the scroll inside the terminal pane instead of yanking
    // the whole page. Skipped while empty so loading the view doesn't jump.
    if (lines.length === 0) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [lines]);

  /** Commands that start with what has been typed so far. */
  const matches = useMemo(() => {
    const value = input.trimStart();
    if (!value) return [];
    return COMPLETIONS.filter(
      (cmd) => cmd.startsWith(value) && cmd !== value
    );
  }, [input]);

  const ghost = matches[0] ? matches[0].slice(input.trimStart().length) : "";

  const run = (cmd: string) => {
    const raw = cmd.trim().replace(/^\.\/ali\s*/, "");

    if (raw) setHistory((prev) => [...prev, raw]);
    setHistoryIndex(null);

    if (raw.startsWith("--view ")) {
      const target = raw.split(" ")[1] as Template;
      if (TEMPLATE_NAMES.includes(target)) {
        setLines((prev) => [...prev, { command: cmd }]);
        setTemplate(target);
        return;
      }
      setLines((prev) => [
        ...prev,
        { command: cmd, output: `unknown template: ${target}` },
      ]);
      return;
    }
    if (raw === "clear") {
      setLines([]);
      return;
    }
    const output = HISTORY[raw];
    setLines((prev) => [
      ...prev,
      { command: cmd, output: output ?? `command not found: ${raw}` },
    ]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    run(input);
    setInput("");
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    // Tab cycles through matching commands rather than moving focus away.
    if (e.key === "Tab") {
      e.preventDefault();
      if (matches.length === 0) return;
      const next = e.shiftKey
        ? matches[matches.length - 1]
        : matches[0];
      setInput(next);
      return;
    }

    // Up/Down walk previously run commands, like a real shell.
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-4 py-6">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={palette.open}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          🔍 <span className="hidden sm:inline">⌘K</span>
        </button>
        <SettingsBar />
      </div>

      <div
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 shrink-0 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 shrink-0 rounded-full bg-green-500/70" />
          <span className="ml-2 truncate font-mono text-xs text-muted sm:ml-4">
            ali@portfolio: ~
          </span>
        </div>

        {/*
         * The prompt lives inside the scroll area, directly after the last
         * output line, the way a real shell behaves: it starts at the top and
         * walks down as output accumulates, instead of being pinned to the
         * bottom edge with dead space above it.
         */}
        <div className="h-[55vh] overflow-y-auto p-4 font-mono text-sm leading-relaxed sm:h-[60vh] sm:p-6">
          <p className="text-muted">
            Welcome! Type <span className="text-accent">help</span> to see
            available commands.
          </p>

          {lines.map((line, i) => (
            <div key={i} className="terminal-line mt-4">
              <p className="break-words">
                <span className="text-accent">$</span> ./ali {line.command}
              </p>
              {line.output && (
                <p className="mt-1 break-words text-muted">{line.output}</p>
              )}
            </div>
          ))}

          <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
            <span className="shrink-0 text-accent">$</span>
            <span className="shrink-0 text-muted">./ali</span>

            <div className="relative min-w-0 flex-1">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre"
              >
                <span className="invisible">{input}</span>
                <span className="text-muted/50">{ghost}</span>
              </div>
              {/* Ring suppressed on purpose: terminal use is keyboard-only, so
                  the ring would always be on. The `$ ./ali` prompt and the
                  native caret are the focus indicator here. */}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="relative w-full bg-transparent outline-none"
                aria-label="Terminal command"
              />
            </div>
          </form>

          <div ref={endRef} />
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-xs leading-relaxed text-muted">
        <span className="text-accent">Tab</span> autocomplete ·{" "}
        <span className="text-accent">↑↓</span> history ·{" "}
        <span className="text-accent">⌘K</span> command palette
      </p>
    </main>
  );
}
