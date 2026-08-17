"use client";

import { useI18n } from "@/i18n";
import { useCountUp, useInView, splitStat } from "@/hooks/useInView";
import { Section } from "./Chrome";

function Stat({
  icon,
  value,
  label,
  active,
  tilt,
}: {
  icon: string;
  value: string;
  label: string;
  active: boolean;
  tilt: string;
}) {
  const parsed = splitStat(value);
  const counted = useCountUp(parsed?.number ?? 0, active);

  return (
    <div className={`broken-tape relative bg-card px-6 py-8 text-center ${tilt}`}>
      <span className="text-xl">{icon}</span>
      <p className="broken-glitch mt-3 text-4xl font-black tabular-nums text-accent sm:text-5xl">
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

const TILTS = ["rotate-1", "-rotate-1", "rotate-2"] as const;

export default function BrokenStats() {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <Section>
      <div ref={ref} className="grid gap-4 sm:grid-cols-3">
        {t.default.stats.items.map((stat, i) => (
          <Stat
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            active={inView}
            tilt={TILTS[i % TILTS.length]}
          />
        ))}
      </div>
    </Section>
  );
}
