import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import './Profile.css';
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({onSignOut}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main>
                <section className="profile">
                    <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                    {/* <form className="profile__form">
                        <input 
                            className="profile__input"
                            placeholder="Имя"
                            type="name"
                            id="profile-name"
                            minLength={2}
                            maxLength={40}
                        />
                        <input
                            className="profile__input"
                            placeholder="E-mail"
                            type="email"
                            id="profile-email"
                        />
                        <div className="profile__links">
                            <button className="profile__link" type="button">Редактировать</button>
                            <NavLink to="/" className="profile__link">
                                <button type="button" className="profile__link-logout" onClick={onSignOut}>Выйти из аккаунта</button>
                            </NavLink>
                            
                        </div>                    
                    </form> */}
                    <div className="profile__container">
                        <div className="profile__info">
                            <span className="profile__name">Имя</span>
                            <span className="profile__name">{currentUser.name}</span>
                        </div>
                        <span className="underline"/>
                        <div className="profile__info">
                            <span className="profile__name">E-mail</span>
                            <span className="profile__name">{currentUser.email}</span>
                        </div>
                    </div>   
                   
                    <div className="profile__links">
                        <button className="profile__link" type="button">Редактировать</button>
                        <NavLink to="/" className="profile__link">
                            <button type="button" className="profile__link-logout" onClick={onSignOut}>Выйти из аккаунта</button>
                        </NavLink>                            
                    </div>

                 </section>
            </main>        
        </>
            
    )
}

export default Profile;