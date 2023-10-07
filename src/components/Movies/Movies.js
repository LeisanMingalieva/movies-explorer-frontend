import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesFilter, moviesFilterDuration } from "../../utils/moviesFilter";
import * as MoviesApi from '../../utils/MoviesApi';
import { LARGE_SIZE, MEDIUM_SIZE, TABLET_SIZE } from '../../utils/constants';
import { CARDS_SIZE_L, CARDS_SIZE_M, CARDS_SIZE_XL, CARDS_SIZE_S } from "../../utils/constants";
import './Movies.css'
import Preloader from "../Preloader/Preloader";

function Movies({ loggedIn, savedMovies, handleMovieLikeStatus, handleDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredMoviesShortAndSearch, setFilteredMoviesShortAndSearch] = useState([]);
  const [movieCheckboxStatus, setMovieCheckboxStatus] = useState(false); 
  const [isPreloader, setIsPreloader] = useState(false);
  const [isSuccessfulRequest, setIsSuccessfulRequest] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesToShow, setMoviesToShow] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();
     
  useEffect(() => {
    if(localStorage.getItem('movie-checkbox-status') === 'true') {
      setMovieCheckboxStatus(true)
    } else {
      setMovieCheckboxStatus(false)
    }
  }, [])
    //поиск фильмов в зависимости от критерия поиска
  function searchMovies(movieToSearch) {
    localStorage.setItem('movie-to-search', movieToSearch);
    localStorage.setItem('movie-checkbox-status', movieCheckboxStatus);
    if(localStorage.getItem('all-movies')) {
      const movies = JSON.parse(localStorage.getItem('all-movies'))
      handleFilterMovies(movies, movieToSearch, movieCheckboxStatus)
    } else {
      setIsPreloader(true)
      MoviesApi
        .getMovies()
        .then((cardsData) => {
          localStorage.setItem('all-movies', JSON.stringify(cardsData));
          handleFilterMovies(cardsData, movieToSearch, movieCheckboxStatus);
        })
        .catch((err) => {
          setErrorMessage('Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setIsPreloader(false)
        })
    }
  }

    function handleFilterMovies(moviesList, movieToSearch, short) {
      const movies = moviesFilter(moviesList, movieToSearch); 
      (movies.length === 0 && setNotFound(true)) ? (setIsSuccessfulRequest(false)) : (setIsSuccessfulRequest(true));
      setFilteredMovies(movies);
      setFilteredMoviesShortAndSearch(short ? moviesFilterDuration(movies) : movies);
      localStorage.setItem('filtered-movies', JSON.stringify(movies));
      localStorage.setItem('movie-to-search', movieToSearch);
    }

    function handleShortMovies() {
      setMovieCheckboxStatus(!movieCheckboxStatus);
      if (!movieCheckboxStatus) {
        setFilteredMoviesShortAndSearch(moviesFilterDuration(filteredMovies));
      } else {
        setFilteredMoviesShortAndSearch(filteredMovies);
      }
    }

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
        
      if(location.pathname === '/movies') {
        if (windowWidth >= LARGE_SIZE) {
          setMoviesToShow(CARDS_SIZE_XL);
        } else if (windowWidth < LARGE_SIZE && windowWidth > MEDIUM_SIZE) {
          setMoviesToShow(CARDS_SIZE_L);
        } else if (windowWidth < MEDIUM_SIZE && windowWidth >= TABLET_SIZE) {
          setMoviesToShow(CARDS_SIZE_M);
        } else {
          setMoviesToShow(CARDS_SIZE_S);
        }
      }
    
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth, location, savedMovies]);
      
    const handleLoadMoreClick = () => {
      if (windowWidth >= LARGE_SIZE) {
        setMoviesToShow(moviesToShow + 4);
      } else if (windowWidth < LARGE_SIZE && windowWidth > MEDIUM_SIZE) {
        setMoviesToShow(moviesToShow + 4);
      } else if (windowWidth < MEDIUM_SIZE && windowWidth >= TABLET_SIZE) {
        setMoviesToShow(moviesToShow + 4);
      } else {
        setMoviesToShow(moviesToShow + 2);
      }      
    }
      
    useEffect(() => {
      if (localStorage.getItem('filtered-movies')) {
        const movies = JSON.parse(
          localStorage.getItem('filtered-movies')
        );
        setFilteredMovies(movies);
        (movies.length === 0 && setNotFound(true)) ? (setIsSuccessfulRequest(false)) : (setIsSuccessfulRequest(true));
        if (localStorage.getItem('movie-checkbox-status') === 'true') {
          setMovieCheckboxStatus(true);
          setFilteredMoviesShortAndSearch(moviesFilterDuration(movies));
        } else {
          setMovieCheckboxStatus(false);
          setFilteredMoviesShortAndSearch(movies);
        }
      }
    }, []);
    
    useEffect(() => {
      if (localStorage.getItem('movie-to-search')) {
        if (filteredMoviesShortAndSearch.length === 0) {
          setIsSuccessfulRequest(false);
        } else {
          setIsSuccessfulRequest(true);
        }
      } 
      else {
        setIsSuccessfulRequest(false);
      }
    }, [filteredMoviesShortAndSearch]);

    return (
        <>
        <Header isLoggedIn={loggedIn} />
        <main>
          <SearchForm 
            searchMovies={searchMovies}
            onFilter={handleShortMovies}
            movieCheckboxStatus={movieCheckboxStatus}
          />
          {isPreloader && <Preloader />}
          {isSuccessfulRequest
          ? <MoviesCardList 
              isPreloader={isPreloader}
              movies={filteredMoviesShortAndSearch}
              savedMovies={savedMovies}
              handleMovieLikeStatus={handleMovieLikeStatus}
              handleDeleteMovie={handleDeleteMovie}
              moviesToShow={moviesToShow}
            />
          : (
            notFound && (
              <p className="movies__error">Ничего не найдено</p>
            )
          )}
          
          {moviesToShow < filteredMoviesShortAndSearch.length && (<button onClick={handleLoadMoreClick} type="button" className="movies__button">Ещё</button>)}
        </main>
        <Footer />         
        </>
    )
}

export default Movies;
