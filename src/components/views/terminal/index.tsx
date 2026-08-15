"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useView } from "@/components/providers/ViewProvider";
import type { View } from "@/components/providers/ViewProvider";
import SettingsBar from "@/components/shared/SettingsBar";

type Line = {
  command?: string;
  output?: string;
};

const HISTORY: Record<string, string> = {
  "--about": "Drogan — Software Engineer & Android Developer",
  "--skills": "[kotlin, compose, nextjs, typescript, nodejs, postgresql]",
  "--projects": "[aplikasi-catatan, portfolio-website, rest-api-basic]",
  "--contact": "github.com/drogan120 · drogan120@gmail.com",
  help: "commands: --about, --skills, --projects, --contact, --view <default|apiDocs|terminal>, clear, help",
};

export default function TerminalView() {
  const { setView } = useView();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (cmd: string) => {
    const raw = cmd.trim().replace(/^\.\/drogan\s*/, "");
    if (raw.startsWith("--view ")) {
      const target = raw.split(" ")[1] as View;
      if (["default", "apiDocs", "terminal"].includes(target)) {
        setLines((prev) => [...prev, { command: cmd }]);
        setView(target);
        return;
      }
      setLines((prev) => [
        ...prev,
        { command: cmd, output: `unknown view: ${target}` },
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
    run(input);
    setInput("");
  };

  return (
    <main className="flex min-h-screen flex-col px-4 py-6">
      <div className="mb-4 flex justify-end">
        <SettingsBar />
      </div>

      <div
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-4 font-mono text-xs text-muted">
            drogan@portfolio: ~
          </span>
        </div>

        <div className="h-[60vh] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          <p className="text-muted">
            Welcome! Type <span className="text-accent">help</span> to see
            available commands.
          </p>

          {lines.map((line, i) => (
            <div key={i} className="mt-4">
              <p>
                <span className="text-accent">$</span> ./drogan {line.command}
              </p>
              {line.output && (
                <p className="mt-1 text-muted">{line.output}</p>
              )}
            </div>
          ))}

          <div ref={endRef} />
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-sm"
        >
          <span className="text-accent">$</span>
          <span className="text-muted">./drogan</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none"
            aria-label="Terminal command"
          />
        </form>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-xs text-muted">
        ketik <span className="text-accent">--view apiDocs</span> atau{" "}
        <span className="text-accent">--view default</span> untuk pindah tampilan
      </p>
    </main>
  );
}
