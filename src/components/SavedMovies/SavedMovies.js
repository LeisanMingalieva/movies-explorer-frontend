import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesFilter, moviesFilterDuration } from "../../utils/moviesFilter";
import './SavedMovies.css'

function SavedMovies({ loggedIn, savedMovies, handleDeleteMovie }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [shortMovies, setShortMovies] = useState(false);
    const [filteredMoviesShortAndSearch, setFilteredMoviesShortAndSearch] = useState(savedMovies);
    const [isSuccessRequest, setIsSuccessRequest] = useState(true);
    const [movieToSearch, setMovieToSearch] = useState('');
    //const [notFound, setNotFound] = useState(false);

    function handleSearchMovies(movieToSearch, short) {
        const movies = moviesFilter(savedMovies, movieToSearch)
        setFilteredMovies(movies)
        setMovieToSearch(movieToSearch)
        setFilteredMoviesShortAndSearch(short ? moviesFilterDuration(movies) : movies)
    }

    useEffect(() => {
        if(shortMovies) {
            setFilteredMoviesShortAndSearch(moviesFilterDuration(moviesFilter(savedMovies, movieToSearch)))
        } else {
            setFilteredMoviesShortAndSearch(moviesFilter(savedMovies, movieToSearch))
        }
    }, [shortMovies, savedMovies, movieToSearch])

    useEffect(() => {
        if(filteredMoviesShortAndSearch.length === 0) {
          setIsSuccessRequest(false)
        } else {
          setIsSuccessRequest(true)
        }
    }, [filteredMoviesShortAndSearch])

    function handleShortMovies() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            setFilteredMoviesShortAndSearch(moviesFilterDuration(filteredMovies));
        } else {
            setFilteredMoviesShortAndSearch(filteredMovies);
        }
      }

    return (
        <>
            <Header isLoggedIn={loggedIn} />
            <main>
                <SearchForm
                    searchMovies={handleSearchMovies}
                    onFilter={handleShortMovies} 
                    shortMovies={shortMovies}
                />
                {isSuccessRequest
                ? <MoviesCardList
                    movies={filteredMoviesShortAndSearch}
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                />
                : <p className="saved-movies__error">Ничего не найдено</p>}                
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;
