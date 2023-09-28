import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import './SearchForm.css';

function SearchForm ({ onSearchMovie, onChooseShortMovies, shortMoviesCheck }) {
    const [movieToSearch, setMovieToSearch] = useState("");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/saved-movies') {
            setMovieToSearch('');
        } else {
            const previousMovieToSearch = JSON.parse(
                localStorage.getItem('movie-to-search')
            )
            setMovieToSearch(previousMovieToSearch)
        }
    }, [location.pathname])

    const handleOnChange = (evt) => {
        setMovieToSearch(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchMovie(movieToSearch);
      };
      
    return (
        <div className="search-form">
            <form onSubmit={handleSubmit} className="search-form__container" name="search">
                <input
                    className="search-form__input"
                    value={movieToSearch ?? ""}
                    onChange={handleOnChange}
                    id="search-input"
                    type="text"
                    name="movie"
                    placeholder="Фильм"
                />
                <span className="search-form__error"></span>
                <button className="search-form__button" type="submit"></button>                   
            </form>
            <FilterCheckbox 
                shortMoviesCheck={shortMoviesCheck}
                onChooseShortMovies={onChooseShortMovies} />
        </div>
    )
}

export default SearchForm;