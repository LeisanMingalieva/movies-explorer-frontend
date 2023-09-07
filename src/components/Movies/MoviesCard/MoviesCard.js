import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import './MoviesCard.css';
import * as MainApi from '../../../utils/MainApi';
import { moviesUrl } from "../../../utils/constants";
import { UserMoviesContext } from '../../../contexts/UserMoviesContext';
import { setTimeDuration } from "../../../utils/timeDuration";


function MoviesCard({ movie }) {
  const url = useLocation();
  const { userMovies, setUserMovies } = useContext(UserMoviesContext);
  const moviePath = url.pathname === '/movies';
  const [isSaved, setIsSaved] = useState(false);
  const { nameRU, duration, image, trailerLink } = movie;

  useEffect(() => {
    setIsSaved(
      userMovies.some((userMovie) => userMovie.nameRu === movie.nameRu)
    );

  }, [userMovies, movie.nameRU]);

  function handleSaved() {
    MainApi
      .saveUserMovie(movie)
      .then(() => {
        setIsSaved(true);
        setUserMovies([...userMovies, movie])
      })
      .catch((err) => console.log(`Ой, ошибка ${err}`))
  }

  function toggleSaved() {
    const isSavedMovies = userMovies.some((userMovies) => userMovies.nameRu === movie.nameRu)
    if(!isSavedMovies) {
      handleSaved();
    } else {
      const savedMovies = userMovies.find((userMovies) => userMovies.nameRU === movie.nameRU)
      if(savedMovies) {
        MainApi
          .deleteUserMovie(savedMovies._id)
          .then(() => {
            setUserMovies(userMovies.filter((userMovies) => userMovies._id !== savedMovies._id));
            setIsSaved(false);
          })
          .catch((err) => console.log(`Ой, ошибка ${err}`))
      }
    }
  }

  return (
    <div className='movie'>
      <a href={trailerLink}>
       <img className='movie__image' src={`${moviesUrl}${image.url}`} alt={nameRU}/>
      </a>
        <div className='movie__description'>
        <h2 className='movie__title'>{nameRU}</h2>
          {
            moviePath && (
              <button className={`movie__button ${isSaved ? 'movie__button_saved' : ''}`} type="button" onClick={handleSaved}/>
            )
          }
          {
            !moviePath && (
              <button className='movie__button movie__button_delete' type="button"/>
            )
          }
        </div>
        <p className='movie__duration'>{setTimeDuration(duration)}</p>
    </div>
  )
}

export default MoviesCard;