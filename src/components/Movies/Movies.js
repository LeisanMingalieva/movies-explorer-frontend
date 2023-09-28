import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'

function Movies({
    loggedIn,
    isPreloader,
    onSearchMovie,
    moviesArray,
    notFound,
    onSaveMovie,
    isSaved,
    shortMoviesCheck,
    onChooseShortMovies
}) {    
    return (
        <>
        <Header isLoggedIn={loggedIn} />
        <main>
            <SearchForm 
                shortMoviesCheck={shortMoviesCheck}
                onChooseShortMovies={onChooseShortMovies}
                onSearchMovie={onSearchMovie}
            />
            {isPreloader && <Preloader/>}
            <MoviesCardList
                isSaved={isSaved}
                onSaveMovie={onSaveMovie}
                notFound={notFound}
                moviesArray={moviesArray}
            />           
        </main>
        <Footer />         
        </>
    )
}

export default Movies;