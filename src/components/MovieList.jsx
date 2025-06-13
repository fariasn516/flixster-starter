import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const API_TOKEN = import.meta.env.VITE_API_KEY;

function MovieList({
  searchQuery,
  sortInput,
  favorites,
  toggleFavorite,
  showFavorites,
  watched,
  toggleWatched,
  showWatched,
}) {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [loadedMovies, setLoadedMovies] = useState(12);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const totalPagesToFetch = 3;
      let allResults = [];

      try {
        for (let page = 1; page <= totalPagesToFetch; page++) {
          const response = await fetch(`${URL}&page=${page}`, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          allResults = [...allResults, ...data.results];
        }

        const uniqueMovies = Array.from(
          new Map(allResults.map((movie) => [movie.id, movie])).values()
        );

        setAllMovies(uniqueMovies);
      } catch (err) {
        setError("Failed to load movies.");
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchedMovies(allMovies);
    } else {
      const searched = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedMovies(searched);
    }

    setLoadedMovies(12);
  }, [searchQuery, allMovies]);

  useEffect(() => {
    let sorted = [...searchedMovies];

    switch (sortInput) {
      case "sort-title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "sort-release-date":
        sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        break;
      case "sort-vote-average":
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      default:
        break;
    }

    setSortedMovies(sorted);
  }, [searchedMovies, sortInput]);

  useEffect(() => {
    if (showFavorites) {
      const favoriteMovies = sortedMovies.filter((movie) =>
        favorites.includes(movie.id)
      );
      setDisplayedMovies(favoriteMovies);
    } else {
      setDisplayedMovies(sortedMovies);
    }
  }, [sortedMovies, favorites, showFavorites]);

  useEffect(() => {
    if (showWatched) {
      const watchedMovies = sortedMovies.filter((movie) =>
        watched.includes(movie.id)
      );
      setDisplayedMovies(watchedMovies);
    } else {
      setDisplayedMovies(sortedMovies);
    }
  }, [sortedMovies, watched, showWatched]);

  const loadMoreMovies = () => {
    setLoadedMovies((shown) => {
      return shown + Math.min(12, displayedMovies.length - shown);
    });
  };

  return (
    <section className="movie-container">
      {displayedMovies.length === 0 ? (
        <p className="no-results">{"No movies found."}</p>
      ) : (
        <>
          <ul className="movie-list">
            {displayedMovies.slice(0, loadedMovies).map((movie) => (
              <li key={movie.id} className="movie-list-item">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rateAvg={movie.vote_average}
                  isFavorite={favorites.includes(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie.id)}
                  isWatched={watched.includes(movie.id)}
                  onToggleWatched={() => toggleWatched(movie.id)}
                />
              </li>
            ))}
          </ul>

          {loadedMovies < displayedMovies.length && (
            <div className="load-button-container">
              <button className="load-button" onClick={loadMoreMovies}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MovieList;
