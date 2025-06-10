import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import data from "../data/data";

const URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const API_TOKEN = import.meta.env.VITE_API_KEY;

function MovieList({ searchQuery }) {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loadedMovies, setLoadedMovies] = useState(6);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAllMovies(data.results);
    setSearchedMovies(data.results);

    /*
    // API call code - commented out for now
    const getMovies = async () => {
      try {
        // Use the Bearer token in the Authorization header only
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        setAllMovies(data.results);
        setFilteredMovies(data.results);
      }
      catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
      }
    };

    getMovies();
    */
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchedMovies(allMovies);
    }
    else {
      const searched = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedMovies(searched);
    }

    setLoadedMovies(6);
  }, [searchQuery, allMovies]);

  const loadMoreMovies = () => {
    setLoadedMovies(shown => {
      return shown + Math.min(6, searchedMovies.length - shown);
    });
  };

  return (
    <section className="movie-container">
      {searchedMovies.length === 0 ? (
        <div className="no-results">No movies found matching "{searchQuery}"</div>
      ) : (
        <>
          <div className="movie-list">
            {searchedMovies.slice(0, loadedMovies).map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rateAvg={movie.vote_average}
                genres={movie.genre_ids}
                releaseDate={movie.release_date}
                overview={movie.overview}
              />
            ))}
          </div>

          {loadedMovies < searchedMovies.length && (
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
