export const Movie = ({ movie, children, onSelectMovie }) => {
  const handleClick = () => {
    if (!onSelectMovie) return;
    onSelectMovie(movie.imdbID);
  };
  return (
    <li onClick={handleClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>{children}</div>
    </li>
  );
};
