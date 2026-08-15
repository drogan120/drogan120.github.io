"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
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
      <span className="preloader-dot" />
      <span className="preloader-dot" />
      <span className="preloader-dot" />
    </div>
  );
}