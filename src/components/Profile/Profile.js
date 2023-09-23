import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';
import NameInput from "../InputForm/NameInput";
import EmailInput from "../InputForm/EmailInput";

function Profile({ onSignOut, handleUpdateProfile, loggedIn }) {
    const currentUser = useContext(CurrentUserContext);
    const { register, handleSubmit, watch, formState: { errors, isValid }} = useForm({ mode: "onChange" })
    const inputName = watch('name');
    const inputEmail = watch('email');
    const [isInputActive, setIsInputActive] = useState(false);
    const [isSaveButtonValid, setIsSaveButtonValid] = useState(false);
    const isDisabledBtn  = isValid && isSaveButtonValid;
    useEffect(() => {
        const isNameEqual = inputName === currentUser.name;
        const isEmailEqual = inputEmail === currentUser.email;
        setIsSaveButtonValid(!(isNameEqual && isEmailEqual));
    }, [inputName, inputEmail, currentUser]);

    const handleChangeInputs = () => {
        setIsInputActive(true);
    }
    const submitData = (data) => {
        setIsInputActive(false);
        handleUpdateProfile(data);
    }
    return (
        <>
            <Header isLoggedIn={loggedIn} />
            <main>
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__description">
                            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                            <div className="profile__info">
                                <span className="profile__name">Имя</span>
                                <span className={`profile__name ${isInputActive ? "hidden" : ""}`}>
                                    {currentUser.name}
                                </span>
                                <div className={`profile__input ${isInputActive ? "" : "hidden"}`}>
                                    <NameInput
                                        type="text"
                                        title="name"
                                        defaultValue={currentUser.name}
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <span className="underline" />
                            <div className="profile__info">
                                <span className="profile__name">E-mail</span>
                                <span className={`profile__name ${isInputActive ? "hidden" : ""}`}>
                                    {currentUser.email}
                                </span>
                                <div className={`profile__input ${isInputActive ? "" : "hidden"}`}>
                                    <EmailInput
                                        type="email"
                                        title="email"
                                        defaultValue={currentUser.email}
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>                    
                        <div className="profile__links">
                            {!isInputActive ? (
                                <>
                                    <button className="profile__link" type="button" onClick={handleChangeInputs}>Редактировать</button>
                                    <NavLink to="/" className="profile__link">
                                       <button type="button" className="profile__link-logout" onClick={onSignOut}>Выйти из аккаунта</button>
                                    </NavLink>
                                </>
                            ) : (
                                <button className={`profile__link-save ${isDisabledBtn ? "" : "profile__link-save_disabled"}`} onClick={handleSubmit(submitData)} disabled={!isDisabledBtn}>
                                    Сохранить
                                </button>
                            )} 
                        </div>
                    </div>             
                </section>
            </main>        
        </>
            
    )
}

export default Profile;