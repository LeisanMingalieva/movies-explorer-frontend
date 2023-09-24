import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({ 
    loggedIn,
    savedMoviesArray,
    deleteMovie,
    onSearchMovie,
    notFound,
    onChooseShortMovies,
    savedShortMoviesCheck
}) {
    return (
        <>
            <Header isLoggedIn={loggedIn} />
            <main>
                <SearchForm
                    onSearchMovie={onSearchMovie}
                    onChooseShortMovies={onChooseShortMovies}
                    shortMoviesCheck={savedShortMoviesCheck}
                />
                <MoviesCardList
                    notFound={notFound}
                    deleteMovie={deleteMovie}
                    savedMoviesArray={savedMoviesArray}
                />
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;