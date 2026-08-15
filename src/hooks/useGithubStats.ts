"use client";

import { useI18n } from "@/i18n";

export type GithubStat = {
  key: "repos" | "stars" | "followers" | "contributions";
  icon: string;
  /** Localized label, e.g. "Repositories" / "Repositori". */
  label: string;
  /** The actual count from the profile data, e.g. 38. */
  value: number;
};

/**
 * GitHub profile stats.
 *
 * Every template used to read `t.default.github[key]`, which resolves to the
 * localized *label* ("Repositories"), so a long word was rendered at heading
 * size and the real counts never showed up at all. Labels and numbers are kept
 * apart here so that can't happen again.
 */
export function useGithubStats() {
  const { t } = useI18n();
  const { counts } = t.default.github;

  const stats: GithubStat[] = [
    { key: "repos", icon: "📦", label: t.default.github.repos, value: counts.repos },
    { key: "stars", icon: "⭐", label: t.default.github.stars, value: counts.stars },
    {
      key: "followers",
      icon: "👥",
      label: t.default.github.followers,
      value: counts.followers,
    },
    {
      key: "contributions",
      icon: "🌱",
      label: t.default.github.contributions,
      value: counts.contributions,
    },
  ];

  return {
    stats,
    username: counts.username,
    profileUrl: `https://github.com/${counts.username}`,
  };
}
