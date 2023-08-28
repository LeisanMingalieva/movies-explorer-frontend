import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
            <div className="filter__container">
                <label className="filter">
                    <input className="filter__checkbox" type="checkbox"></input>
                    <span className="filter__tumbler"></span>
                    <span className="filter__text">Короткометражки</span>
                </label>               
            </div>
    )
}

export default FilterCheckbox;