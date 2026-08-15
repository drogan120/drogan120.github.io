"use client";

import { useCallback, useSyncExternalStore } from "react";

function makeEventName(key: string) {
  return `drogan-storage:${key}`;
}

/**
 * localStorage hook yang aman untuk SSR/hydration, dibangun di atas
 * useSyncExternalStore. Bisa dipakai juga antar-tab.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) callback();
      };
      const onCustom = () => callback();
      window.addEventListener("storage", onStorage);
      window.addEventListener(makeEventName(key), onCustom);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(makeEventName(key), onCustom);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    return localStorage.getItem(key);
  }, [key]);

  const getServerSnapshot = useCallback(() => {
    return null;
  }, []);

  const raw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(makeEventName(key)));
    },
    [key]
  );

  let parsed: T = initialValue;
  if (raw !== null) {
    try {
      parsed = JSON.parse(raw) as T;
    } catch {
      parsed = initialValue;
    }
  }

  return [parsed, setValue] as const;
}
