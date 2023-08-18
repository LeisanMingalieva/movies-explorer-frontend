import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css'

function Header({isLoggedIn}) {
    const url = useLocation();
    const header = url.pathname === '/movies' ? 'header_movies-login' : 'header_main-login';
    
    const profileMarkup = isLoggedIn ? (
        <button className="header__button header__button_account">Аккаунт</button>
      ) : (
        <nav className="header__profile-nav">
          <button className="header__button header__button_register">Регистрация</button>
          <button className="header__button header__button_login">Войти</button>
        </nav>
      );
    
      return (
        <div className={`header ${isLoggedIn ? header : ""}`}>
          <div className="header__container">
            <NavLink to="/">
              <img src={logo} className="header__logo" alt="логотип" />
            </NavLink>
            {isLoggedIn ? <Navigation /> : null}
            {profileMarkup}
            {isLoggedIn ? <BurgerMenu /> : null}
          </div>
        </div>
      )
    }

export default Header;