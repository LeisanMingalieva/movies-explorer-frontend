import React from "react";
import image from '../../images/movie-pic.jpg';
import {useLocation} from "react-router-dom";

import './MoviesCard.css';

function MoviesCard() {
  const url = useLocation();
  const moviePath = url.pathname === '/movies';
  const [isSaved, setIsSaved] = React.useState(true);

  const handleSaved = () => {
    setIsSaved((state) => !state);
  }
  return (
    <div className='movie'>
      <img className='movie__image' src={image} alt='Обложка фильма'/>
      <div className='movie__description'>
        <p className='movie__title'>33 слова о дизайне</p>
        {
          moviePath && (
            <button className={`movie__button ${isSaved ? 'movie__button_saved' : ''}`} onClick={handleSaved}/>
          )
        }
        {
          !moviePath && (
            <button className='movie__button movie__button_delete'/>
          )
        }
      </div>
      <p className='movie__duration'>1ч42м</p>
    </div>
  )
}

export default MoviesCard;