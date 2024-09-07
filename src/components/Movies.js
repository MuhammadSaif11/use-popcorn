import { Movie } from "./Movie";
import { MovieDetails } from "./MovieDetails";

export const Movies = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID}>
          <MovieDetails emoji="📅">{movie.Year}</MovieDetails>
        </Movie>
      ))}
    </ul>
  );
};
