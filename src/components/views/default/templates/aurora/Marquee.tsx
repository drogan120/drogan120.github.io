"use client";

import { useI18n } from "@/i18n";

/**
 * Infinite tech rail.
 *
 * Every skill across all groups is flattened into one list, then rendered
 * twice inside the track. Translating the track by exactly -50% therefore
 * lands on the identical second copy, giving a seamless loop with no JS.
 * `aria-hidden` because the same words are already listed in Skills.
 */
export default function AuroraMarquee() {
  const { t } = useI18n();

  const skills = t.default.skills.groups.flatMap((g) => g.skills);
  if (skills.length === 0) return null;

  const row = (reverse: boolean) => (
    <div className="marquee-wrap marquee-mask overflow-hidden">
      <div
        className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {skills.map((skill, i) => (
              <span
                key={`${copy}-${skill}-${i}`}
                className="flex items-center gap-6 px-6 font-mono text-sm whitespace-nowrap text-muted sm:text-base"
              >
                {skill}
                <span className="text-accent/50">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div aria-hidden className="relative space-y-3 py-6">
      {row(false)}
      {row(true)}
    </div>
  );
}
