import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className="movies-list">
            {[...Array(6).keys()].map((item) => <MoviesCard key={item} />)}
            <button className="movies-list__button" type="button">Ещё</button>
        </section>
    )
}


export default MoviesCardList;