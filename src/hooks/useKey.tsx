import { useEffect } from "react";

export function useKey(key: KeyboardEvent["code"], action: () => void) {
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
