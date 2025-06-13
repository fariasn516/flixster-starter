import React from "react";
import { useState, useEffect } from "react";

const API_TOKEN = import.meta.env.VITE_API_KEY;

function MovieCardModal({ isOpen, onClose, movieId }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [error, setError] = useState(null);

    // Fetch movie details and trailer when the modal opens
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setMovieDetails(null);
                setTrailer(null);
                setError(null);

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

        if (movieId) {
            getMovieDetails();
        }
    }, [movieId]);

    // Format genres as comma-separated list
    const formatGenres = (genres) => {
        return genres.map(genre => genre.name);
    };

    // Create rating stars based on rating
    const createRatingStars = (rating) => {
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = rating % 2 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`}>★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half">✬</span>);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`}>☆</span>);
        }

        return stars;
    };

    if (!isOpen) return null;

    return (
        <section className="modal-open">
            <div className="modal-content">
                <button className="close" onClick={onClose}>&times;</button>
                <section className="modal-header">
                    <img className="modal-image"
                        src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
                        alt={`${movieDetails.title} Backdrop`}
                    />
                    <h2 className="modal-title">{movieDetails.title}</h2>
                </section>

                <section className="modal-body">
                    <div className="modal-info">
                        <div className="modal-info-left">
                            <div className="modal-genre-tags">
                                {formatGenres(movieDetails.genres).map((genre, index) => (
                                    <span key={index} className="genre-tag">{genre}</span>
                                ))}
                            </div>
                            <p className="modal-rating">
                                Rating: {movieDetails.vote_average.toFixed(1)}/10
                                <span className="rating-stars">
                                    {createRatingStars(movieDetails.vote_average)}
                                </span>
                            </p>
                            <p><strong>Runtime:</strong> {movieDetails.runtime} Minutes</p>
                            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                        </div>

                        <div className="modal-info-right">
                            <p id="modal-overview"><strong>Overview:</strong> {movieDetails.overview}</p>
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
                </section>
            </div>
        </section>
    );
}

export default MovieCardModal;
