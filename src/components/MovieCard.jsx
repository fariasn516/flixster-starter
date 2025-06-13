import React from "react";
import { useState } from "react";
import MovieCardModal from "./MovieCardModal";

function MovieCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMovieModal = () => {
    setIsModalOpen(true);
  };

  const closeMovieModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    props.onToggleFavorite();
  };
  const handleWatched = (e) => {
    e.stopPropagation();
    props.onToggleWatched();
  };

  return (
    <>
      <article className="movie-card" onClick={openMovieModal}>
        <img src={props.poster} alt={`${props.title} Poster`} />
        <h2>{props.title}</h2>
        <p className="movie-card-rating">
          <strong>Rating: </strong>
          {props.rateAvg}/10
        </p>
        <div className="movie-card-buttons">
          <button onClick={handleLike} className="movie-like-button">
            {props.isFavorite ? `❤️` : `♡`}
          </button>
          <button onClick={handleWatched} className="movie-watched-button">
            {props.isWatched ? `✓` : `☐`}
          </button>
        </div>
      </article>

      <MovieCardModal
        isOpen={isModalOpen}
        onClose={closeMovieModal}
        movieId={props.id}
      />
    </>
  );
}

export default MovieCard;
