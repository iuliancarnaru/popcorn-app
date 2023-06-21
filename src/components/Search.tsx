import { useRef } from "react";
import { useKey } from "../hooks/useKey";

interface SearchProps {
  query: string;
  onSetQuery: (value: string) => void;
}

function Search({ query, onSetQuery }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current?.focus();
    onSetQuery("");
  });

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
