import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    return (
            <div className="search-form">
                <form className="search-form__container">
                    <input className="search-form__input" placeholder="Фильм" required></input>
                    <button className="search-form__button" type="submit"></button>                   
                </form>
                <FilterCheckbox />
            </div>
    )
}

export default SearchForm;