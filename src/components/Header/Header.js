import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Navigation from './Navigation/Navigation';
import './Header.css';


function Header({ isLoggedIn }) {
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
            <NavLink to="/profile" className="header__button header__button_account">
              Аккаунт
            </NavLink>        
          ) : (
            <nav className="header__profile-nav">
              <NavLink to="/signup" className="header__button header__button_register">
                Регистрация
              </NavLink>
              <NavLink to="/signin" className="header__button header__button_login">
                Войти
              </NavLink>         
            </nav>
          )}
          {isLoggedIn ? <BurgerMenu /> : null}
        </div>
      </header>
    )
  }

export default Header;