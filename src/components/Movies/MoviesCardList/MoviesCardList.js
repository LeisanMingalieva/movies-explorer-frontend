import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from "react-router";

function MoviesCardList({ moviesList, isLoading, errorMessage, onAddMovies, movies }) {
    const location = useLocation();
    const moviesPath = location.pathname === '/movies';
    const message = errorMessage ? 'Ничего не найдено' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    return (
        isLoading ? <Preloader/> :
        <>
          <section className="movies-list">
            {movies.length > 0 ? (movies.map((movie) => {
                return <MoviesCard key={movie.id} movie={movie} moviesList={moviesList} />
            }))
            : (<p className="movies-list__mess">{message}</p>)        
            }
            {moviesPath && moviesList.length > movies.length &&
                <button onClick={onAddMovies} className="movies-list__button" type="button">Ещё</button>            
            }
            
          </section>
        </>
        
    )
}


export default MoviesCardList;