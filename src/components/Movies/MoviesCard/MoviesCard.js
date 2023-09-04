import React from "react";
import { useLocation } from "react-router-dom";

import './MoviesCard.css';

function MoviesCard({movie}) {
  const url = useLocation();
  const moviePath = url.pathname === '/movies';
  const [isSaved, setIsSaved] = React.useState(true);

  const handleSaved = () => {
    setIsSaved((state) => !state);
  }
  return (
    <ul className='movie'>
      <li>
       <img className='movie__image' src={movie.thumbnail} alt={movie.nameRU}/>
      </li>
      <li>
        <div className='movie__description'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
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
      </li>
      <li>
        <p className='movie__duration'>{movie.duration}</p>
      </li>      
    </ul>
  )
}

export default MoviesCard;