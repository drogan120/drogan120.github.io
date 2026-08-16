"use client";

import { useEffect, useState } from "react";
import { useTemplate } from "@/components/providers/TemplateProvider";

const ANIME_PHRASES = ["起動中", "読込中", "準備中", "生成中"];
const NIHON_PHRASES = [
  { text: "起動中", reading: "きどうちゅう" },
  { text: "読込中", reading: "よみこみちゅう" },
  { text: "準備中", reading: "じゅんびちゅう" },
  { text: "生成中", reading: "せいせいちゅう" },
] as const;

export default function Preloader() {
  const { template } = useTemplate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={done ? "preloader preloader-hide" : "preloader"}
      aria-hidden="true"
    >
      {template === "anime" ? (
        <AnimePreloader />
      ) : template === "nihon" ? (
        <NihonPreloader />
      ) : (
        <>
          <div className="preloader-stage">
            <div className="buddy buddy-sm buddy-bounce">
              <span className="buddy-eye buddy-eye-left" />
              <span className="buddy-eye buddy-eye-right" />
              <span className="buddy-mouth" />
            </div>
            <span className="buddy-shadow buddy-shadow-squish w-11" />
          </div>

          <div className="preloader-dots">
            <span className="preloader-dot" />
            <span className="preloader-dot" />
            <span className="preloader-dot" />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Manga-styled loader for the anime template: a big vertical kanji watermark,
 * a speech bubble cycling through Japanese "loading" phrases, and the classic
 * bobbing dots. All text is decorative.
 */
function AnimePreloader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % ANIME_PHRASES.length),
      260
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-anime">
      <span className="anime-speedline anime-speedline-a" />
      <span className="anime-speedline anime-speedline-b" />

      <span className="anime-kanji preloader-anime-kanji">
        読込中
      </span>

      <div className="preloader-anime-bubble">
        {ANIME_PHRASES[index]}
      </div>

      <div className="preloader-dots">
        <span className="preloader-dot" />
        <span className="preloader-dot" />
        <span className="preloader-dot" />
      </div>
    </div>
  );
}

/**
 * Nihon loader: a calm washi panel with the reading "よみこみちゅう" spelled
 * out, the sun symbol and cycling Japanese phrases.
 */
function NihonPreloader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % NIHON_PHRASES.length),
      260
    );
    return () => clearInterval(interval);
  }, []);

  const phrase = NIHON_PHRASES[index];

  return (
    <div className="preloader-nihon">
      <span className="nihon-sun" />
      <span className="nihon-kanji-bg">和</span>

      <div className="preloader-nihon-panel">
        <span className="preloader-nihon-kanji">{phrase.text}</span>
        <span className="preloader-nihon-reading">
          【{phrase.reading}】
        </span>
      </div>

      <div className="preloader-dots">
        <span className="preloader-dot" />
        <span className="preloader-dot" />
        <span className="preloader-dot" />
      </div>
    </div>
  );
}
