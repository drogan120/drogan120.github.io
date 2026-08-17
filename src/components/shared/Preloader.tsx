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
const BROKEN_PHRASES = [
  "loading…",
  "still loading…",
  "almost there…",
  "it's broken, I swear",
] as const;
const NUSANTARA_PHRASES = [
  { text: "Membatik…", reading: "nusantara" },
  { text: "Menyalakan lampu…", reading: "wayang kulit" },
  { text: "Menabuh gamelan…", reading: "sekar gending" },
  { text: "Menyiapkan pentas…", reading: "slametan" },
] as const;

export default function Preloader() {
  const { template } = useTemplate();
  const [done, setDone] = useState(false);
  // The template comes from localStorage, so it is unknown during SSR and the
  // first client paint. Rendering the buddy variant until the next frame
  // (when the stored template is known) avoids a React 418 hydration mismatch
  // with the static HTML.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(() => setDone(true), 700);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={done ? "preloader preloader-hide" : "preloader"}
      aria-hidden="true"
    >
      {mounted && template === "anime" ? (
        <AnimePreloader />
      ) : mounted && template === "nihon" ? (
        <NihonPreloader />
      ) : mounted && template === "broken" ? (
        <BrokenPreloader />
      ) : mounted && template === "nusantara" ? (
        <NusantaraPreloader />
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

      <div className="preloader-nihon-panel">
        <span className="nihon-furigana">
          <span className="nihon-furigana-rt">{phrase.reading}</span>
          <span className="nihon-furigana-txt">{phrase.text}</span>
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

/**
 * Broken loader: a lopsided card with a tape strip, a huge split-RGB "loading"
 * mark and a cycling set of deadpan captions, as if the loader itself is
 * barely holding together.
 */
function BrokenPreloader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % BROKEN_PHRASES.length),
      260
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-broken">
      <div className="broken-tape -rotate-2 bg-card px-8 py-7">
        <p className="text-center text-4xl font-black text-accent sm:text-5xl">
          <span className="broken-glitch-layer" data-text="LOADING">
            LOADING
          </span>
        </p>
        <p className="mt-2 rotate-1 text-center font-mono text-sm text-muted">
          <span className="broken-stack" data-text={BROKEN_PHRASES[index]}>
            {BROKEN_PHRASES[index]}
          </span>
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="preloader-dot" />
          <span className="preloader-dot" />
          <span className="preloader-dot" />
        </div>
      </div>
    </div>
  );
}

/**
 * Nusantara loader: a batik paper panel with the phrase in gold and its
 * reading below, cycling through wayang-opening phrases.
 */
function NusantaraPreloader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % NUSANTARA_PHRASES.length),
      260
    );
    return () => clearInterval(interval);
  }, []);

  const phrase = NUSANTARA_PHRASES[index];

  return (
    <div className="preloader-nusantara">
      <div className="nusantara-panel rounded-2xl px-8 py-7">
        <p className="text-center text-4xl font-black text-accent sm:text-5xl">
          {phrase.text}
        </p>
        <p className="mt-2 text-center font-mono text-sm tracking-[0.3em] text-muted">
          {phrase.reading}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="preloader-dot" />
          <span className="preloader-dot" />
          <span className="preloader-dot" />
        </div>
      </div>
    </div>
  );
}
