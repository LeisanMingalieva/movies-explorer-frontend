import React from "react";
import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import { useForm } from '../../hooks/useForm';

function Login({handleLogin, buttonText}) {
    const {values, handleChange, setValues} = useForm({email: "", password: ""})

     const handleSubmit =(e) => {
        e.preventDefault();
        
        handleLogin(values);
        setValues({
            email: "",
            password: "",
          });
    }
    return (
      <main>
        <section className="login">
            <Link to="/" className="login__logo" src={logo} alt="Логотип"></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form onSubmit={handleSubmit} className="login__form" name="register__form">
                <div className="login__container">
                    <label className="login__label">E-mail</label>
                    <input
                        onChange={handleChange}
                        className="login__input"
                        id="email"
                        type="email"
                        placeholder="email@yandex.ru"
                        required
                        minLength={2}
                        maxLength={40}
                        name="email"
                        value={values.email}
                        autoComplete="email"
                    />
                    <span className="login__span"></span>
                </div>
                <div className="login__container">
                    <label className="login__label">Пароль</label>
                    <input 
                        onChange={handleChange}
                        className="login__input"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        required
                        minLength={2}
                        maxLength={40}
                        name="password"
                        value={values.password}
                        autoCorrect="password"
                    />
                    <span className="login__span"></span>
                </div>
                <div className="login__button-container">
                    <button className="login__button" type="submit">{buttonText}</button>
                    <p className="login__button-text">Ещё не зарегистрированы?
                    <Link to="/signup" className="login__login-link">Регистрация</Link> 
                    </p>                       
                </div>
            </form>            
        </section>
      </main>  
        

    )
}

export default Login;