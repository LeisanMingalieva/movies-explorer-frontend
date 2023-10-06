import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { moviesUrl } from "../../utils/constants";
import { setTimeDuration } from "../../utils/timeDuration";
import './MoviesCard.css';

function MoviesCard({ movie, savedMovie, savedMovies, handleMovieLikeStatus, handleDeleteMovie }) {
  const location = useLocation();
  const moviePath = location.pathname === '/movies';
  const [isSavedMovie, setIsSavedMovie] = useState(savedMovie ? true : false);
  
  useEffect(() => {
    setIsSavedMovie(savedMovie)
  }, [savedMovie]
  )

  const handleAddClick = () => {
    if(isSavedMovie) {
      handleDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0])
    } else {
      handleMovieLikeStatus(movie)
    }
  }

  const handleDeleteClick = () => {
    handleDeleteMovie(movie)
  }
  const image = moviePath ? `${moviesUrl}${movie.image.url}` : movie.image
  let buttonClassName;
  if(moviePath) {
    buttonClassName = `${isSavedMovie ? 'movie__button movie__button_saved-active' : 'movie__button movie__button_saved'}`
  } else if(!moviePath) {
    buttonClassName = 'movie__button movie__button_delete'
  }
    
  return (
    <div className='movie'>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='movie__image' src={image} alt={movie.nameRU}/>
      </a>
      <div className='movie__description'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
          {moviePath 
          ? (<button
              className={buttonClassName}
              type="button"
              onClick={handleAddClick} />)
          : (<button
              className={buttonClassName}
              type="button"
              onClick={handleDeleteClick} />)
          }          
      </div>
      <span className='movie__duration'>{setTimeDuration(movie.duration)}</span>
    </div>
  )
}

export default MoviesCard;