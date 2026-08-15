import { useI18n } from "@/i18n";

const cardColors = [
  "from-pink-100 to-pink-50",
  "from-purple-100 to-purple-50",
  "from-sky-100 to-sky-50",
];

const accentColors = ["text-pink-400", "text-purple-400", "text-sky-400"];

export default function PastelAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400">
          {t.default.about.label}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          {t.default.about.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.default.about.cards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i]} p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md`}
          >
            <span className={`text-lg font-bold ${accentColors[i]}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-700">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-slate-500">
        {t.default.about.paragraph}
      </p>
    </section>
  );
}
