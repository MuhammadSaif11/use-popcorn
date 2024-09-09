import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { NavBar } from "./NavBar";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Main } from "./Main";
import { ListBox } from "./ListBox";
import { Summary } from "./Summary";
import { SelectedMovieDetail } from "./SelectedMovieDetail";
import { WatchedBox } from "./WatchedBox";
import { WatchedMovies } from "./WatchedMovies";
import { Movies } from "./Movies";
import { useLocalStorageState } from "../custom-hooks/useLocalStorageState";

export const KEY = "ffca9a28";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState(() => {
  //   return localStorage.getItem("watchedMovies")
  //     ? JSON.parse(localStorage.getItem("watchedMovies"))
  //     : [];
  // });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectedMovie = (id) => {
    setSelectedMovie((selectedId) => (selectedId === id ? null : id));
  };
  const handleCloseSelectedMovie = () => {
    setSelectedMovie(null);
  };
  const handleAddWatchedMovies = (watchedMovie) => {
    setWatched((watchedMovies) => {
      const filteredMovies = watchedMovies.filter(
        (movie) => movie.imdbID !== watchedMovie.imdbID
      );
      return [...filteredMovies, watchedMovie];
    });
  };
  const handleDeleteWatchedMovie = (id) => {
    setWatched((watchedMovies) =>
      watchedMovies.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("something went wrong with fetching movies");
        const movies = await res.json();

        if (movies.Response === "False") throw new Error("Movie not found");
        setMovies(movies.Search);
        setError("");
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseSelectedMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //   localStorage.setItem("watchedMovies", JSON.stringify(watched));
  // }, [watched]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {!query && <p className="loader">Search Any Movie...</p>}
          {!loading && !error && (
            <Movies onSelectMovie={handleSelectedMovie} movies={movies} />
          )}
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox>
          {selectedMovie ? (
            <SelectedMovieDetail
              selectedMovie={selectedMovie}
              addToWatchList={handleAddWatchedMovies}
              onCloseSelectedMovie={handleCloseSelectedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovies
                watched={watched}
                onRemoveWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </WatchedBox>
      </Main>
    </>
  );
};
