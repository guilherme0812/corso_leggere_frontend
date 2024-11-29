"use client";

import { useState, useEffect } from "react";

export function useZustandStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setData(result);
  }, [result]);

  return data as F;
}
