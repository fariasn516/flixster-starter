import React from "react";
import { useState } from "react";
import MovieCardModal from "./MovieCardModal";

function MovieCard(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const openMovieModal = () => {
    setIsModalOpen(true);
  };

  const closeMovieModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleWatched = (e) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
  };

  return (
    <>
      <article className="movie-card" onClick={openMovieModal}>
        <h2>{props.title}</h2>
        <img src={props.poster} alt={`${props.title} Poster`} />
        <p>Rating: {props.rateAvg}/10</p>
        <button onClick={handleLike} class="movie-like-button">{isLiked ? `♥️` : `♡`}</button>
        <button onClick={handleWatched} class="movie-watched-button">{isWatched ? `👀👍` : `👀👎`}</button>
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
