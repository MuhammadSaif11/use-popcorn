import { Movie } from "./Movie";
import { MovieDetails } from "./MovieDetails";

export const WatchedMovies = ({ watched, onRemoveWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Movie movie={movie} key={movie.imdbID}>
          <MovieDetails emoji="⭐">{movie.imdbRating}</MovieDetails>
          <MovieDetails emoji="🌟">{movie.userRating}</MovieDetails>
          <MovieDetails emoji="⌛">{movie.runtime} min</MovieDetails>
          <button
            className="btn-delete"
            onClick={() => onRemoveWatchedMovie(movie.imdbID)}
          >
            X
          </button>
        </Movie>
      ))}
    </ul>
  );
};
