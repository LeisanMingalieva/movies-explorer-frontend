import React, { useEffect, useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';

function MoviesCardList({ moviesArray, isSaved, savedMoviesArray, notFound, onSaveMovie, deleteMovie}) {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [numCardsToShow, setNumCardsToShow] = useState();
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if(location.pathname === '/movies') {
      if (windowWidth >= 1280) {
        setNumCardsToShow(16);
      } else if (windowWidth < 1280 && windowWidth > 989) {
        setNumCardsToShow(12);
      } else if (windowWidth < 989 && windowWidth >= 768) {
        setNumCardsToShow(8);
      } else {
        setNumCardsToShow(5);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, location, moviesArray]);
  
  const handleLoadMoreClick = () => {
    if (windowWidth >= 1280) {
      setNumCardsToShow(numCardsToShow + 4);
    } else if (windowWidth < 1280 && windowWidth > 989) {
      setNumCardsToShow(numCardsToShow + 4);
    } else if (windowWidth < 989 && windowWidth >= 768) {
      setNumCardsToShow(numCardsToShow + 4);
    } else {
      setNumCardsToShow(numCardsToShow + 2);
    }      
  }  
    
    return (
        <>
          {location.pathname === '/saved-movies' && 
            (savedMoviesArray.length ? (
              <section className="movies-list">
              {savedMoviesArray.map((savedMovies) => {
                return (
                  <MoviesCard key={savedMovies._id} movie={savedMovies} onChangeMovieStatus={deleteMovie} />
                )
              })}
              </section>
            ) : (
              notFound && (
                <p className="movies-list__not-found">
                  Ничего не найдено
                </p>
              )
            ))}
            {location.pathname === '/movies' && (
              <>
                {moviesArray.length ? (
                <section className="movies-list">
                {moviesArray.slice(0, numCardsToShow).map((searchedMovie) => {
                  return (
                    <MoviesCard key={searchedMovie.id} movie={searchedMovie} onChangeMovieStatus = {onSaveMovie} isSaved={isSaved} />
                  )
                })}
                </section>
              ) : (
                notFound && (
                  <p className="movies-list__not-found">
                    Ничего не найдено
                  </p>
                )
              )}
              {numCardsToShow < moviesArray.length && (
                <button onClick={handleLoadMoreClick} className="movies-list__button" type="button">
                  Ещё
                </button>
              )

              }
              </>
              )}
         </>
    )
}


export default MoviesCardList;