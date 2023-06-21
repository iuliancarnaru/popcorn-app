import { useEffect, useState } from "react";
import { MovieType } from "../types";

export function useMovies(query: string, callback?: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Unable to fetch movies...");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found...");
        }

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError((error as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, callback]);

  return { movies, isLoading, error };
}
