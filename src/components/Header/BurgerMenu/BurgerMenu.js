import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import closeBurgerIcon from "../../../images/closeIcon.svg";
import burgerIcon from "../../../images/burgerIcon.svg";

function BurgerMenu() {
  const [isOpened, setIsOpened] = useState(false);
  const toggleBurger = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={`burger ${isOpened ? "open" : ""}`}>
      <button className="burger__button" type="button">
        <img
          onClick={toggleBurger}
          src={burgerIcon}
          alt="меню"
        />
      </button>
      <div
        className={`burger__overlay ${isOpened ? "open" : ""}`}
        onClick={toggleBurger}
      />
      <nav className="burger__container">
        <img
          onClick={toggleBurger}
          src={closeBurgerIcon}
          className="burger__btn-close"
          alt="закрыть"
        />
        <ul className="burger__items">
          <li className="burger__item">
            <NavLink to="/" className="burger__link">Главная</NavLink>
          </li>
          <li className="burger__item">
            <NavLink to="/movies" className="burger__link">Фильмы</NavLink>
          </li>
          <li className="burger__item">
            <NavLink to="/saved-movies"className="burger__link">Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="burger__account">Аккаунт</NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;