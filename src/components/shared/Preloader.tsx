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
    </div>
  );
}
