import React from "react";
import { useState, useEffect } from "react";

const API_TOKEN = import.meta.env.VITE_API_KEY;

function MovieCardModal({ isOpen, onClose, movieId }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });

                if (!detailsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${detailsResponse.status}`);
                }

                const detailsData = await detailsResponse.json();
                setMovieDetails(detailsData);

                const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    }
                });

                if (!videosResponse.ok) {
                    throw new Error(`HTTP error! Status: ${videosResponse.status}`);
                }

                const videosData = await videosResponse.json();

                const officialTrailer = videosData.results.find(
                    video => video.name.toLowerCase().includes("official trailer")
                );

                const firstVideo = videosData.results.length > 0 ? videosData.results[0] : null;

                setTrailer(officialTrailer || firstVideo || null);

            } catch (err) {
                console.error('Error fetching movie data:', err);
                setError('Failed to load movie data');
            }
        };

        getMovieDetails();
    }, []);

    const formatGenres = (genres) => {
        if (!genres || genres.length === 0) return 'Unknown';
        return genres.map(genre => genre.name).join(', ');
    };

    if (!isOpen) return null;

    return (
        <section className="modal-open">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-header">
                    <h2 className="modal-title">{movieDetails.title}</h2>
                    <div className="modal-image">
                        <img
                            className="modal-poster"
                            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                            alt={`${movieDetails.title} Backdrop Poster`}
                        />
                    </div>
                </div>

                {trailer && (
                    <div className="modal-trailer">
                        <h3>Official Trailer</h3>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movieDetails.title} Trailer`}
                        ></iframe>
                    </div>
                )}

                <div className="modal-info">
                    <p className="modal-rating">Rating: {movieDetails.vote_average}/10</p>
                    <p id="modal-genre">Genre: {formatGenres(movieDetails.genres)}</p>
                    <p id="modal-runtime">Runtime: {movieDetails.runtime} Minutes</p>
                    <p id="modal-overview">Overview: {movieDetails.overview}</p>
                    <p id="modal-release-date">Release Date: {movieDetails.release_date}</p>
                </div>
            </div>
        </section>
    );
}

export default MovieCardModal;
