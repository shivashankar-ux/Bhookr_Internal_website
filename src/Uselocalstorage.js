import { useState } from "react";

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  const set = (val) => {
    try {
      const toStore = typeof val === "function" ? val(value) : val;
      setValue(toStore);
      window.localStorage.setItem(key, JSON.stringify(toStore));
    } catch {}
  };

  return [value, set];
}