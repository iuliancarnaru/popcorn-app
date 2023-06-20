import type { MovieType } from "../types";
import Movie from "./Movie";

function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: MovieType[];
  onSelectMovie: (movieId: string) => void;
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

export default MovieList;
