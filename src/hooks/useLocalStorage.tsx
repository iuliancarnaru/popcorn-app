import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialState: T) {
  const [value, setValue] = useState<T>(
    () => JSON.parse(localStorage.getItem(key) as string) ?? initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
