import { MovieDetails } from "./MovieDetails";

const average = (arr) =>
  arr.length > 0 ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;

export const Summary = ({ watched }) => {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <MovieDetails emoji="#️⃣">{watched.length} movies</MovieDetails>
        <MovieDetails emoji="⭐">{avgImdbRating}</MovieDetails>
        <MovieDetails emoji="🌟">{avgUserRating}</MovieDetails>
        <MovieDetails emoji="⌛">{avgRuntime} min</MovieDetails>
      </div>
    </div>
  );
};
