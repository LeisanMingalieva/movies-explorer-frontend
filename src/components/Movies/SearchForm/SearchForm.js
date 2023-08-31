import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    return (
            <section className="search-form">
                <div className="search-form__container">
                    <input className="search-form__input" placeholder="Фильм" required></input>
                    <button className="search-form__button"></button>                   
                </div>
                <FilterCheckbox />
            </section>
    )
}

export default SearchForm;