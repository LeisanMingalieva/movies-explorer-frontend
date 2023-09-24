import React, { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ onChooseShortMovies, shortMoviesCheck }) {
    const [movieToSearch, setMovieToSearch] = useState("");
    const handleChooseMovieDuration = () => {
        onChooseShortMovies(movieToSearch);
      };
    return (
            <div className="filter">
                <form className="filter__container">
                    <input
                        className="filter__checkbox"
                        type="checkbox"
                        id="toggle"
                        onChange={handleChooseMovieDuration} 
                        checked={shortMoviesCheck && 'checked'}                 
                    />
                    <span className="filter__tumbler"></span>
                    <span className="filter__text">Короткометражки</span>
                </form>               
            </div>
    )
}

export default FilterCheckbox;