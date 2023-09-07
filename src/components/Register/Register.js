import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import { useForm } from '../../hooks/useForm';

function Register({handleRegister, buttonText}) {
    const { values, handleChange } = useForm({name: "", email: "", password: "" })

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values)
    }
    return (
        <main>
            <section className="register">
                <Link to="/" className="register__logo" src={logo} alt="Логотип"></Link>
                <h1 className="register__title">Добро пожаловать!</h1>
                <form onSubmit={handleSubmit} className="register__form" name="register__form">
                    <div className="register__container">
                        <label className="register__label">Имя</label>
                        <input
                            onChange={handleChange}
                            className="register__input"
                            id="name"
                            type="text"
                            placeholder="Виталий"
                            minLength={2}
                            maxLength={40}
                            name="name"
                            value={values.name}
                            autoComplete="name"
                            required
                        />
                        <span className="register__span"></span>
                    </div>
                    <div className="register__container">
                        <label className="register__label">E-mail</label>
                        <input 
                            onChange={handleChange}
                            className="register__input"
                            id="email"
                            type="email"
                            placeholder="email@yandex.ru"
                            name="email"
                            value={values.email}
                            autoComplete="email"
                            required
                        />
                        <span className="register__span"></span>
                    </div>
                    <div className="register__container">
                        <label className="register__label">Пароль</label>
                        <input
                            onChange={handleChange}
                            className="register__input"
                            id="password"
                            type="password"
                            placeholder="Пароль"
                            minLength={2}
                            maxLength={40}
                            name="password"
                            value={values.password}
                            autoComplete="new-password"
                            required
                        />
                        <span className="register__span">Что-то пошло не так...</span>
                    </div>
                    <div className="register__button-container">
                        <button className="register__button" type="submit">{buttonText}</button>
                        <p className="register__button-text">Уже зарегистрированы?
                        <Link to="/signin" className="register__login-link">Войти</Link> 
                        </p>                       
                    </div>
                </form>        
            </section>
        </main>
        
    )
}

export default Register;