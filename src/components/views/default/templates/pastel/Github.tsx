import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

const cardColors = [
  "from-accent/15 to-accent-2/10",
  "from-accent-2/15 to-accent/10",
  "from-accent/15 to-accent-2/15",
  "from-accent-2/15 to-accent/15",
];

export default function PastelGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.github.label}
        </p>
        <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
          {t.default.github.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {t.default.github.description}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.key}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-5 text-center ring-1 ring-border/60 transition-transform hover:-translate-y-1 sm:p-8`}
          >
            <span className="text-3xl">{s.icon}</span>
            <p className="mt-3 text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pop-on-click inline-block rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-background shadow-lg transition-transform hover:scale-105"
        >
          @{username} {t.default.github.viewProfile} ↗
        </a>
      </div>
    </section>
  );
}
