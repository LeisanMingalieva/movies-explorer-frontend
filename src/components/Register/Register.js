import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register() {
    return (
        <div className="register__wrapper">
            <Link to="/" className="register__logo" src={logo} alt="Логотип"></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form" name="register__form">
                <div className="register__form-container">
                    <label className="register__form-label">Имя</label>
                    <input className="register__form-input"
                        id="name"
                        type="text"
                        placeholder="Виталий"
                    />
                    <span className="register__form-span"></span>
                </div>
                <div className="register__form-container">
                    <label className="register__form-label">E-mail</label>
                    <input className="register__form-input"
                        id="email"
                        type="email"
                        placeholder="email@yandex.ru"
                    />
                    <span className="register__form-span"></span>
                </div>
                <div className="register__form-container">
                    <label className="register__form-label">Пароль</label>
                    <input className="register__form-input"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                    />
                    <span className="register__form-span"></span>
                </div>
            </form>
            
        </div>

    )
}

export default Register;