import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import logo from '../../images/logo.svg';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Navigation from './Navigation/Navigation';
import './Header.css';


function Header({isLoggedIn}) {
    const url = useLocation();
    const header = url.pathname === '/movies' || url.pathname === '/saved-movies' || url.pathname === '/profile'
    ? 'header_login-movies' 
    : 'header_login-main';
    
    return (
      <header className={`header ${isLoggedIn ? header : ""}`}>
        <div className="header__container">
          <NavLink to="/">
            <img src={logo} className="header__logo" alt="логотип" />
          </NavLink>
          {isLoggedIn ? <Navigation /> : null}
          {isLoggedIn ? (
            <NavLink to="/profile">
              <button className="header__button header__button_account" type="button">Аккаунт</button>
            </NavLink>        
          ) : (
            <nav className="header__profile-nav">
              <NavLink to="/signup">
                <button className="header__button header__button_register" type="button">Регистрация</button>
              </NavLink>
              <NavLink to="/signin">
                <button className="header__button header__button_login" type="button">Войти</button>
              </NavLink>         
            </nav>
          )}
          {isLoggedIn ? <BurgerMenu /> : null}
        </div>
      </header>
    )
  }

export default Header;