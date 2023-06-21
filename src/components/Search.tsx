import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  onSetQuery: (value: string) => void;
}

function Search({ query, onSetQuery }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function callback(event: KeyboardEvent) {
      if (document.activeElement === inputRef.current) return;

      if (event.code === "Enter") {
        inputRef.current?.focus();
        onSetQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onSetQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputRef}
    />
  );
}

export default Search;
