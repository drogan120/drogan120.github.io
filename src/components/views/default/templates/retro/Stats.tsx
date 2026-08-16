"use client";

import { useI18n } from "@/i18n";
import { useCountUp, useInView, splitStat } from "@/hooks/useInView";
import { Section } from "./Chrome";

function Stat({
  icon,
  value,
  label,
  active,
}: {
  icon: string;
  value: string;
  label: string;
  active: boolean;
}) {
  const parsed = splitStat(value);
  const counted = useCountUp(parsed?.number ?? 0, active);

  return (
    <div className="relative px-6 py-8 text-center">
      <span className="text-xl">{icon}</span>
      <p className="retro-glow mt-3 text-4xl font-black tabular-nums text-accent sm:text-5xl">
        {parsed ? (
          <>
            {counted.toLocaleString()}
            {parsed.suffix}
          </>
        ) : (
          value
        )}
      </p>
      <p className="mt-2 font-mono text-xs text-muted">{label}</p>
    </div>
  );
}

export default function RetroStats() {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <Section>
      <div
        ref={ref}
        className="grid divide-y divide-accent/20 overflow-hidden rounded-lg border border-accent/30 bg-card/80 shadow-[0_0_24px_-14px_var(--accent)] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {t.default.stats.items.map((stat) => (
          <Stat
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            active={inView}
          />
        ))}
      </div>
    </Section>
  );
}