import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../AuthForm/AuthForm";
import EmailInput from "../InputForm/EmailInput";
import PasswordInput from "../InputForm/PasswordInput";

const Login = ({ handleLogin }) => {
    const {
      register,
      handleSubmit,
      formState: {errors, isValid}
    } = useForm({mode: "onChange"});

  const submitData = (data) => {
    handleLogin(data);
  }

    return (
        <AuthForm
            formName="login"
            helloText="Рады видеть!"
            buttonText="Войти"
            loggedText="Ещё не зарегистрированы?"
            path="/signup"
            signLinkText="Регистрация"
            onSubmit={handleSubmit(submitData)}            
            isValid={isValid}
        >
            <EmailInput 
                inputName="E-mail"
                title="email"
                name="email"
                type="email"
                placeholder="pochta@mail.ru"
                errors={errors}
                register={register}
            />
            <PasswordInput
                inputName="Пароль"
                title="password"
                name="password"
                type="password"
                placeholder="Пароль"
                errors={errors}
                register={register}
            />
        </AuthForm>
      )
}

export default Login;