import { useEffect, useRef, useState } from "react";
import type { MovieDetailsType, WatchedMovieType } from "../types";
import StarRating from "./StarRating";
import Loader from "./Loader";

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovieType) => void;
  watched: WatchedMovieType[];
}) {
  const [movie, setMovie] = useState<MovieDetailsType | Record<string, never>>(
    {}
  );
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const countRef = useRef(0);

  const hasBeenWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie: WatchedMovieType = {
      imdbID: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      userRating,
      runtime: Number(movie.Runtime?.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&i=${selectedId}`
      );

      const data = await res.json();

      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = "Popcorn App";
    };
  }, [movie]);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    if (userRating) {
      countRef.current += 1;
    }
  }, [userRating]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {hasBeenWatched ? (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
