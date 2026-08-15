import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function BrutalistGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
          {t.default.github.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.github.label}]
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px border-2 border-foreground bg-foreground lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="bg-card p-5 sm:p-6">
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-2 font-mono text-3xl font-black tabular-nums text-accent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 break-words font-mono text-xs font-bold uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pop-on-click border-2 border-foreground bg-accent px-6 py-3 font-mono text-sm font-bold uppercase text-background shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            @{username} {t.default.github.viewProfile} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
