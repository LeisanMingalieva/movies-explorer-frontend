import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Profile.css';
import Header from "../Header/Header";

function Profile(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main>
                <section className="profile">
                    <h1 className="profile__title">{`Привет, ${props.name}!`}</h1>
                    <form className="profile__form">
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
                                <button type="button" className="profile__link_logout">Выйти из аккаунта</button>
                            </NavLink>
                            
                        </div>                    
                    </form>
                 </section>
            </main>        
        </>
            
    )
}

export default Profile;