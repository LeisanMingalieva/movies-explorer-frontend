import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader'

// function Movies({loggedIn, moviesList}) {
//     const [isToggled, setIsToggled] = useState(false);
//     const localStorageQuery = localStorage.getItem("query")
//     const [searchQuery, setIsSearchQuery] = useState(localStorageQuery || "")
//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setIsSearchQuery(value);
//         localStorage.setItem("query", value)
//     }
//     return (
//         <>
//         <Header isLoggedIn={loggedIn} />
//         <main>
//             <SearchForm 
//                 //onSearchClick={handleSearchMovies}
//                 handleSearchChange={handleSearchChange}
//                 //setFilteredMovies={setFilteredMovies}
//                 //onToggle={handleToggleSwitch}
//                 defaultValue={localStorageQuery}
//                 isToggled={isToggled}
//                 searchQuery={searchQuery}
//             /> 
//             <MoviesCardList moviesList={moviesList}/>           
//         </main>
//         <Footer />         
//         </>
//     )
// }
function Movies({
    loggedIn,
    isPreloader,
    onSearchMovie,
    moviesArray,
    notFound,
    onSaveMovie,
    isSaved,
    onChooseShortMovies,
    shortMoviesCheck
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