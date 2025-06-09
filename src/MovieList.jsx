import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import data from "./data/data";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loadedMovies, setLoadedMovies] = useState(6);

  useEffect(() => {
    setMovies(data.results);
  }, []);

  const loadMoreMovies = () => {
    setLoadedMovies(shown => {
      const remainingMovies = movies.length - shown;
      return shown + Math.min(6, remainingMovies);
    });
  };

  return (
    <section className="movie-container">
      <div className="movie-list">
        {movies.slice(0, loadedMovies).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            rateAvg={movie.vote_average}
          />
        ))}
      </div>

      {loadedMovies < movies.length && (
        <div className="load-button-container">
          <button className="load-button" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

export default MovieList;
