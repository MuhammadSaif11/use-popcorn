import { useState, useEffect } from "react";
import { KEY } from "./App";
import { Loader } from "./Loader";
import { StarRating } from "./StarRating";
import { useKey } from "../custom-hooks/useKey";

export const SelectedMovieDetail = ({
  selectedMovie,
  onCloseSelectedMovie,
  addToWatchList,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const alreadyAddedMovie = watched.find(
    (movie) => movie.imdbID === selectedMovie
  );

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  const handleAddToWatchList = () => {
    const newWatchedMovie = {
      imdbID: selectedMovie,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(" ")[0]),
      userRating,
    };

    addToWatchList(newWatchedMovie);
    onCloseSelectedMovie();
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [selectedMovie]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;
    return () => {
      document.title = "🍿 usePopcorn";
    };
  }, [Title]);

  useKey("keydown", (e) => {
    if (e.code === "Escape") onCloseSelectedMovie();
  });

  // useEffect(() => {
  //   const callback = (e) => {
  //     if (e.code === "Escape") onCloseSelectedMovie();
  //   };
  //   document.addEventListener("keydown", callback);

  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // },[onCloseSelectedMovie]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseSelectedMovie}>
              ⬅
            </button>
            <img src={Poster} alt={`Poster of ${Title} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                defaultRating={
                  alreadyAddedMovie ? alreadyAddedMovie.userRating : 0
                }
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddToWatchList}>
                  Add To List
                </button>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starrings {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </div>
      )}
    </>
  );
};
