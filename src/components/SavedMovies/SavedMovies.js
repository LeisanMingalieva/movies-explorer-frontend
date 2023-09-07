import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="main">
                <SearchForm/>
                <MoviesCardList/>
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies;