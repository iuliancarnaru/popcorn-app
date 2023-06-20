import { WatchedMovieType } from "../types";
import WatchedMovie from "./WatchedMovie";

function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: {
  watched: WatchedMovieType[];
  onDeleteWatched: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
