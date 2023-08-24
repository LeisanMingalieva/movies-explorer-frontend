import React from "react";
import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login({buttonText}) {
    return (
        <div className="login__wrapper">
            <Link to="/" className="login__logo" src={logo} alt="Логотип"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__form" name="register__form">
                <div className="login__container">
                    <label className="login__label">E-mail</label>
                    <input className="login__input"
                        id="email"
                        type="email"
                        placeholder="email@yandex.ru"
                    />
                    <span className="login__span"></span>
                </div>
                <div className="login__container">
                    <label className="login__label">Пароль</label>
                    <input className="login__input"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                    />
                    <span className="login__span"></span>
                </div>
                <div className="login__button-container">
                    <button className="login__button" type="submit">{buttonText}</button>
                    <p className="login__button-text">Ещё не зарегистрированы?
                    <Link to="/sign-up" className="login__login-link">Регистрация</Link> 
                    </p>                       
                </div>
            </form>
            
        </div>

    )
}

export default Login;