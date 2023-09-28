import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../AuthForm/AuthForm";
import EmailInput from "../InputForm/EmailInput";
import PasswordInput from "../InputForm/PasswordInput";
import NameInput from "../InputForm/NameInput";
import { useLocation } from 'react-router-dom';

function Register ({handleRegister, loggedIn}) {
  const url = useLocation();
  if(url.pathname === '/signup' && !loggedIn) {
    url.pathname = '/'
  }
  const {
    register,
		handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

	const submitData = (data) => {
		handleRegister(data);
	}
    return (
      <AuthForm 
        formName="register"
        helloText="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        loggedText="Уже зарегистрированы?"
        path="/signin"
        signLinkText="Войти"
        onSubmit={handleSubmit(submitData)}
        isValid={isValid}
      >
        <NameInput
          inputName="Имя"
          type="text"
          title="name"
          placeholder="Виталий"
          register={register}
          errors={errors}
        />        
        <EmailInput 
          inputName="E-mail"
          type="email"
          title="email"
          placeholder="pochta@yandex.ru"
          errors={errors}
          register={register}
        />
        <PasswordInput
          inputName="Пароль"
          type="password"
          title="password"
          placeholder="пароль"
          errors={errors}
          register={register}
        />
      </AuthForm>
    )
}

export default Register;