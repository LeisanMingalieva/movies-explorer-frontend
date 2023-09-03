import React from "react";
import image from '../../../images/movie-pic.jpg';
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
    <ul className='movie'>
      <li>
       <img className='movie__image' src={image} alt='Обложка фильма'/>
      </li>
      <li>
        <div className='movie__description'>
        <h2 className='movie__title'>33 слова о дизайне</h2>
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
        <p className='movie__duration'>1ч42м</p>
      </li>      
    </ul>
  )
}

export default MoviesCard;