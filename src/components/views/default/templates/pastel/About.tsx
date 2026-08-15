import { useI18n } from "@/i18n";

const cardColors = [
  "from-pink-100/70 to-pink-50/70 dark:from-pink-400/20 dark:to-purple-400/10",
  "from-purple-100/70 to-purple-50/70 dark:from-purple-400/20 dark:to-pink-400/10",
  "from-pink-100/70 to-purple-50/70 dark:from-pink-400/15 dark:to-purple-400/15",
];

const accentColors = [
  "text-pink-400 dark:text-pink-300",
  "text-purple-400 dark:text-purple-300",
  "text-purple-400 dark:text-pink-300",
];

export default function PastelAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400 dark:text-purple-300">
          {t.default.about.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-purple-50">
          {t.default.about.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.default.about.cards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i]} p-8 transition-transform hover:-translate-y-1 dark:ring-1 dark:ring-white/10`}
          >
            <span className={`text-sm font-bold ${accentColors[i]}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-700 dark:text-purple-50">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-purple-100/60">
              {card.description}
            </p>
          </div>
        ))}
      </div>

        <p className="mx-auto mt-14 max-w-3xl text-center leading-relaxed text-slate-500 dark:text-purple-100/60">
          {t.default.about.paragraph}
        </p>
    </section>
  );
}
