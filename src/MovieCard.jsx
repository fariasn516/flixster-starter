import React from "react";
import './App.css'

function MovieCard(props) {
  return (
    <article className="movie-card">
      <h2>{props.title}</h2>
      <img src={props.poster} alt={`${props.title} Poster`}/>
      <p>{props.rateAvg}</p>
    </article>
  );
}

export default MovieCard;
