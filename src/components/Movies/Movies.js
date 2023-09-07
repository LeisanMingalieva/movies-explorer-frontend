import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import * as MoviesApi from '../../utils/MoviesApi';

function Movies() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [moviesList, setMoviesList] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');
    const [filterMovie, setFilterMovie] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [renderMovie, setRenderMovie] = useState(16);
    const [isLoading, setIsLoading] = useState(true);
    const filterToShowMovies = filterMovie.slice(0, renderMovie);

    const localStorageMovies = JSON.parse(localStorage.getItem('moviesList'));
    const localStorageShortMovies = JSON.parse(localStorage.getItem('shortMovies'));
    const localStorageSearchMovie = JSON.parse(localStorage.getItem('searchMovie'));
    const localStorageIsToggled = localStorage.getItem('isToggled');
    
    useEffect(() => {
        if(localStorageIsToggled) {
            setIsToggled(true);
        } else {
            setIsToggled(false)
        }
    }, [localStorageIsToggled]
    );

    useEffect(() => {
        MoviesApi
            .getMovies()
            .then((data) => {
                setIsLoading(false);
                setMoviesList(data);
            })
            .catch(() => {
                setIsLoading(false);
                setErrorMessage(true);
            })
    }, []);

    useEffect(() => {
        handleLocalStorageData();
    }, []);

    function handleLocalStorageData() {
        if(localStorageMovies === null) {
            return;
        }

        localStorageShortMovies
        ? setFilterMovie(localStorageMovies)
        : setFilterMovie(localStorageMovies);
        
        setSearchMovie(localStorageSearchMovie);
    }

    function updateRenderMovie() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            setRenderMovie(16);
        } else if (screenWidth >= 768) {
            setRenderMovie(8);
        } else {
            setRenderMovie(5);
        }
    }

    useEffect(() => {
        updateRenderMovie();
        window.addEventListener('resize', () => {
            updateRenderMovie();
        })
        return window.removeEventListener('resize', updateRenderMovie);
    }, []);

    function handleSearchClick() {
        const filter = moviesList.filter((movie) => {
            return movie.nameRu.toLowerCase().includes(searchMovie.toLowerCase().slice(1,-1));
        });
        setFilterMovie(filter);
        localStorage.setItem('moviesList', JSON.stringify(filter));
    }

    function handleToggleMovie() {
        if(isToggled === false) {
            const shortMoviesList = filterMovie.filter((movie) => movie.duration < 40)
            setIsToggled(true);
            setFilterMovie(shortMoviesList);
            localStorage.setItem('isToggled', true);
            localStorage.setItem('shortMovies', JSON.stringify(shortMoviesList));
        } else {
            setIsToggled(false);
            setFilterMovie(localStorageMovies);
            localStorage.setItem('isToggled');
            localStorage.setItem('shortMovies');
        }
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        localStorage.setItem('searchMovie', JSON.stringify(value))
    }

    const handleAddMovies = () => {
        setRenderMovie(
            window.innerWidth > 768 ? renderMovie + 4 : renderMovie + 2
        )
    }

    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        <main>
            <SearchForm 
                onSearchClick={handleSearchClick}    
                handleSearchChange={handleSearchChange}
                setFilterMovie={setFilterMovie}
                onToggle={handleToggleMovie}
                defaultValue={localStorageSearchMovie}
                isToggled={isToggled}
                searchMovie={searchMovie}
            /> 
            <MoviesCardList 
                moviesList={filterMovie}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onAddMovies={handleAddMovies}
                setFilterMovie={setFilterMovie}
                movies={filterToShowMovies}
            />           
        </main>
        <Footer />         
        </>
    )
}

export default Movies;