import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register({buttonText}) {
    return (
        <div className="register__wrapper">
            <Link to="/" className="register__logo" src={logo} alt="Логотип"></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" name="register__form">
                <div className="register__container">
                    <label className="register__label">Имя</label>
                    <input className="register__input"
                        id="name"
                        type="text"
                        placeholder="Виталий"
                    />
                    <span className="register__span"></span>
                </div>
                <div className="register__container">
                    <label className="register__label">E-mail</label>
                    <input className="register__input"
                        id="email"
                        type="email"
                        placeholder="email@yandex.ru"
                    />
                    <span className="register__span"></span>
                </div>
                <div className="register__container">
                    <label className="register__label">Пароль</label>
                    <input className="register__input"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                    />
                    <span className="register__span">Что-то пошло не так...</span>
                </div>
                <div className="register__button-container">
                    <button className="register__button" type="submit">{buttonText}</button>
                    <p className="register__button-text">Уже зарегистрированы?
                    <Link to="/sign-in" className="register__login-link">Войти</Link> 
                    </p>                       
                </div>
            </form>
            
        </div>

    )
}

export default Register;