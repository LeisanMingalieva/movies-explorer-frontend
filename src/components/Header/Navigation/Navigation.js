import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__container">
                <li>
                    <NavLink className="navigation__link" to="/movies">Фильмы</NavLink>
                </li>
                <li>
                    <NavLink className="navigation__link" to="/saved-movies">Сохранённые фильмы</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;