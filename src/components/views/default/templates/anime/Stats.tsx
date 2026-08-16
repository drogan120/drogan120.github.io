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
    <div className="relative border-2 border-border px-6 py-8 text-center">
      <span className="text-xl">{icon}</span>
      <p className="mt-3 text-4xl font-black tabular-nums text-accent sm:text-5xl">
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

export default function AnimeStats() {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <Section>
      <div
        ref={ref}
        className="grid divide-y-2 divide-border overflow-hidden rounded-2xl border-2 border-border bg-card sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0"
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