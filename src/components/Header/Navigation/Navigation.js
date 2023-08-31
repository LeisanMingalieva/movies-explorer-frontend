import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navigation">
            <div className="navigation__container">
                <NavLink className="navigation__link" to="/movies">Фильмы</NavLink>
                <NavLink className="navigation__link" to="/saved-movies">Сохранённые фильмы</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;