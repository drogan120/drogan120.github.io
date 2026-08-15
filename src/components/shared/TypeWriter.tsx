"use client";

import { useEffect, useRef, useState } from "react";

export default function TypeWriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1800,
  className = "",
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timer = setTimeout(() => {
        if (mounted.current) setDeleting(true);
      }, pause);
    } else if (deleting && text === "") {
      timer = setTimeout(() => {
        if (mounted.current) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }, 200);
    } else {
      timer = setTimeout(
        () => {
          if (!mounted.current) return;
          setText(
            deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
