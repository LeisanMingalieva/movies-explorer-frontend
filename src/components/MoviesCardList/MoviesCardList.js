import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
//import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';

function MoviesCardList({ moviesToShow, savedMovies, movies, handleMovieLikeStatus, handleDeleteMovie }) {
  
  function getSavedMovies(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
  }
    
    return (
      <section className="movies-list">
        {/* {isPreloader && <Preloader/>} */}
        {
          movies.slice(0, moviesToShow).map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              savedMovie={getSavedMovies(savedMovies, movie)}
              savedMovies={savedMovies}
              movie={movie}
              handleMovieLikeStatus={handleMovieLikeStatus}
              handleDeleteMovie={handleDeleteMovie}
          />))
        }
      </section>
    )
}


export default MoviesCardList;