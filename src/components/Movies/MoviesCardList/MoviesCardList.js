import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesArray } from "../../utils/constants";

function MoviesCardList() {
    return (
        <section className="movies-list">
            {moviesArray.map((item) => <MoviesCard movie={item} key={item.movieId} />)}
            <button className="movies-list__button" type="button">Ещё</button>
        </section>
    )
}

export default MoviesCardList;