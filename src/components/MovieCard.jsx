import React from "react";
import { useState } from "react";

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

      {/* Modal */}
      <section className={`${isModalOpen ? 'modal-open' : 'modal'}`}>
        <div className="modal-content">
          <span className="close" onClick={closeMovieModal}>&times;</span>
          <div className="modal-header">
            <h2 className="modal-title">{props.title}</h2>
            <div className="modal-image">
              <img classs="modal-poster" src={props.poster} alt={`${props.title} Poster`} />
            </div>
          </div>
          <div className="modal-info">
            <p class="modal-rating">Rating: {props.rateAvg}/10</p>
            <p id="modal-genre">Genre: {props.genre}</p>
            <p id="modal-runtime">Runtime: {props.runtime}</p>
            <p id="modal-overview">Overview: {props.overview}</p>
            <p id="modal-release-date">Release Date: {props.releaseDate}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieCard;
