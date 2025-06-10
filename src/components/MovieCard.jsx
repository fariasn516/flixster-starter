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

  return (
    <>
      <article className="movie-card" onClick={openMovieModal}>
        <h2>{props.title}</h2>
        <img src={props.poster} alt={`${props.title} Poster`} />
        <p>Rating: {props.rateAvg}/10</p>
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
