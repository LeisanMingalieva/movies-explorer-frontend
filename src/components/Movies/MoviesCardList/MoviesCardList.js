import React, { useEffect, useState } from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
//import SavedMovies from "../../SavedMovies/SavedMovies";

function MoviesCardList({ moviesArray, isSaved, savedMoviesArray, notFound, onSaveMovie, deleteMovie}) {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [numCardsToShow, setNumCardsToShow] = useState();
  
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  
  // useEffect(() => {
  //   if (windowWidth >= 1280) {
  //     setNumCardsToShow(16);
  //   } else if (windowWidth < 1280 && windowWidth > 989) {
  //     setNumCardsToShow(12);
  //   } else if (windowWidth < 989 && windowWidth >= 768) {
  //     setNumCardsToShow(8);
  //   } else {
  //     setNumCardsToShow(5);
  //   }
  // }, [windowWidth])

  // const handleLoadMoreClick = () => {
  //   if (windowWidth >= 1280) {
  //     setNumCardsToShow(numCardsToShow + 4);
  //   } else if (windowWidth < 1280 && windowWidth > 989) {
  //     setNumCardsToShow(numCardsToShow + 4);
  //   } else if (windowWidth < 989 && windowWidth >= 768) {
  //     setNumCardsToShow(numCardsToShow + 4);
  //   } else {
  //     setNumCardsToShow(numCardsToShow + 2);
  //   }      
  // }  
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
        // <>
        //   {/* <section className="movies-list">
        //     {moviesList.slice(0, numCardsToShow).map((movie) => {
        //       return <MoviesCard key={movie.nameRU} movie={movie} />
        //     })}           
        //   </section>
        //   {numCardsToShow < moviesList.length && (
        //       <button onClick={handleLoadMoreClick} className="movies-list__button" type="button">
        //         Ещё
        //       </button>   
        //     )} */}
        //     {location.pathname === '/saved-movies' && (
        //       <section className="movies-list">
        //         {moviesList.map((movie) => {
        //           return (
        //             <MoviesCard key={movie.nameRu} movie={movie} />
        //           )
        //         })}
        //       </section>
        //     )}
        //     {location.pathname === '/movies' && (
        //       <section className="movies-list">
        //         {moviesList.slice(0, numCardsToShow).map((movie) => {
        //           return (
        //           <MoviesCard key={movie.nameRu} movie={movie} />
        //         )
        //         })}
        //       </section>
        //     )}
        //     {numCardsToShow < moviesList.length && (
        //       <button onClick={handleLoadMoreClick} className="movies-list__button" type="button">
        //         Ещё
        //       </button>   
        //     )}
        // </>

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