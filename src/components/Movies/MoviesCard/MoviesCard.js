import React from "react";
import { useLocation } from "react-router-dom";
import { moviesUrl } from "../../../utils/constants";
import { setTimeDuration } from "../../../utils/timeDuration";
import './MoviesCard.css';


// function MoviesCard({ movie, onChangeMovieStatus, isSaved }) {
//   const url = useLocation();

//   const moviePath = url === '/movies';
//   //const [isSaved, setIsSaved] = useState(true);

//   // const handleSavedMovies = () => {
//   //   setIsSaved(!isSaved);
//   // }
//   function handleToggleMoviesStatus() {
//     onChangeMovieStatus(url === '/saved-movies' ? movie._id : movie)
//   }
//   return (
//     <div className='movie'>
//       <a href={movie.trailerLink} target="_blank" rel="noreferrer">
//         <img className='movie__image' src={`${moviesUrl}${movie.image.url}`} alt={movie.nameRU}/>
//       </a>
//       <div className='movie__description'>
//         <h2 className='movie__title'>{movie.nameRU}</h2>
//           {
//             moviePath && (
//               <button className={`movie__button ${isSaved ? 'movie__button_saved' : ''}`} type="button" onClick={handleToggleMoviesStatus}/>
//             )
//           }
//           {
//             !moviePath && (
//               <button className='movie__button movie__button_delete' type="button"/>
//             )
//           }
//       </div>
//       <span className='movie__duration'>{setTimeDuration(movie.duration)}</span>
//     </div>
//   )
// }
function MoviesCard({ movie, onChangeMovieStatus, isSaved }) {
  const url = useLocation();
  const moviePath = url.pathname === '/movies';
  const image = moviePath ? `${moviesUrl}${movie.image.url}` : movie.image
  let buttonClassName;
  if(moviePath) {
    buttonClassName = `movie__button ${isSaved(movie) ? 'movie__button_saved-active' : "movie__button_saved"}`
  } else if(!moviePath) {
    buttonClassName = 'movie__button movie__button_delete'
  }
    
  function handleToggleMoviesStatus() {
    onChangeMovieStatus(url === '/saved-movies' ? movie._id : movie)
  }

  return (
    <div className='movie'>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='movie__image' src={image} alt={movie.nameRU}/>
      </a>
      <div className='movie__description'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
          <button className={buttonClassName} type="submit" onClick={handleToggleMoviesStatus}></button>
      </div>
      <span className='movie__duration'>{setTimeDuration(movie.duration)}</span>
    </div>
  )
}

export default MoviesCard;