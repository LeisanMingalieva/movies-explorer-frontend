import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    return (
        <>
        <Header isLoggedIn={isLoggedIn} />
        <main>
            <SearchForm /> 
            <MoviesCardList />           
        </main>
        <Footer />         
        </>
    )
}

export default Movies;