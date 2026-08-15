import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function FashionGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.github.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-4xl font-light sm:text-5xl">
          {t.default.github.title}
        </h2>

        <div className="mx-auto mt-14 grid max-w-4xl gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="bg-background p-8 text-center sm:p-10">
              <span className="text-3xl">{s.icon}</span>
              <p className="mt-4 font-serif text-4xl font-light tabular-nums text-accent sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted sm:text-xs sm:tracking-[0.3em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group pop-on-click relative inline-block text-xs uppercase tracking-[0.3em] transition-colors hover:text-accent"
          >
            @{username} {t.default.github.viewProfile}
            <span className="absolute -bottom-2 left-0 h-px w-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
