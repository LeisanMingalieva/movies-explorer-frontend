import React, { useEffect, useState } from "react";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import './SearchForm.css';

// function SearchForm ({
//     searchQuery,
//     handleSearchChange,
//     onSearchClick,
//     defaultValue,
//     onToggle,
//     isToggled
// }) {   
//     const [queryError, setQueryError] = useState("");

//     function handleSubmit(e) {
//         e.preventDefault();
//         if(searchQuery === "") {
//             setQueryError("Нужно ввести ключевое слово")
//             return;
//         }
//         setQueryError("")   
//         onSearchClick();     
//     }
        
           
    // return (
    //         <div className="search-form">
    //             <form onSubmit={handleSubmit} className="search-form__container" name="search">
    //                 <input
    //                     className="search-form__input"
    //                     id="search-input"
    //                     type="search"
    //                     placeholder="Фильм"
    //                     autoComplete="off"
    //                     onChange={handleSearchChange}
    //                     defaultValue={defaultValue}
    //                 />
    //                 <button className="search-form__button" type="submit"></button>                   
    //             </form>
    //             {queryError && (
    //                 <span className="search-form__error">
    //                 Нужно ввести ключевое слово
    //                 </span>
    //             )}
                
    //             <FilterCheckbox onToggle={onToggle} isToggled={isToggled}/>
    //         </div>
    // )
// }

function SearchForm ({onSearchMovie, onChooseShortMovies, shortMoviesCheck}) {
    const [movieToSearch, setMovieToSearch] = useState("");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/saved-movies') {
            setMovieToSearch('');
        } else {
            const previousMovieToSearch = JSON.parse(
                localStorage.getItem('movie-to-search')
            )
            setMovieToSearch(previousMovieToSearch)
        }
    }, [location.pathname])

    const handleOnChange = (evt) => {
        setMovieToSearch(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchMovie(movieToSearch);
      };

    const handleChooseMovieDuration = () => {
        onChooseShortMovies(movieToSearch);
      };
      
      return (
        <div className="search-form">
            <form onSubmit={handleSubmit} className="search-form__container" name="search">
                <input
                    className="search-form__input"
                    value={movieToSearch ?? ""}
                    onChange={handleOnChange}
                    id="search-input"
                    type="text"
                    name="movie"
                    placeholder="Фильм"
                />
                <span className="search-form__error"></span>
                <button className="search-form__button" type="submit"></button>                   
            </form>
            <FilterCheckbox onChange={handleChooseMovieDuration} checked={shortMoviesCheck && 'checked'} />
        </div>
)

}

export default SearchForm;