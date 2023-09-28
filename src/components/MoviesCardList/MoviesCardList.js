import React, { useEffect, useState } from "react";
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import { useLocation } from "react-router-dom";
import { LARGE_SIZE, MEDIUM_SIZE, TABLET_SIZE } from '../../utils/constants';
import { CARDS_SIZE_L, CARDS_SIZE_M, CARDS_SIZE_XL, CARDS_SIZE_S } from "../../utils/constants";
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
      if (windowWidth >= LARGE_SIZE) {
        setNumCardsToShow(CARDS_SIZE_XL);
      } else if (windowWidth < LARGE_SIZE && windowWidth > MEDIUM_SIZE) {
        setNumCardsToShow(CARDS_SIZE_L);
      } else if (windowWidth < MEDIUM_SIZE && windowWidth >= TABLET_SIZE) {
        setNumCardsToShow(CARDS_SIZE_M);
      } else {
        setNumCardsToShow(CARDS_SIZE_S);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, location, moviesArray]);
  
  const handleLoadMoreClick = () => {
    if (windowWidth >= LARGE_SIZE) {
      setNumCardsToShow(numCardsToShow + 4);
    } else if (windowWidth < LARGE_SIZE && windowWidth > MEDIUM_SIZE) {
      setNumCardsToShow(numCardsToShow + 4);
    } else if (windowWidth < MEDIUM_SIZE && windowWidth >= TABLET_SIZE) {
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