import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
            <div className="filter">
                <form className="filter__container">
                    <input className="filter__checkbox" type="checkbox"></input>
                    <span className="filter__tumbler"></span>
                    <span className="filter__text">Короткометражки</span>
                </form>               
            </div>
    )
}

export default FilterCheckbox;