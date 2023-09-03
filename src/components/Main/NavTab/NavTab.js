import React from "react";
import './NavTab.css';

function NavTab() {
    return (
        <section className="navTab">
            <ul className="navTab__links">
                <li  className="navTab__li"><a className="navTab__link" href="#about-project">О проекте</a></li>
                <li className="navTab__li"><a className="navTab__link" href="#techs">Технологии</a></li>
                <li className="navTab__li"><a className="navTab__link" href="#student">Студент</a></li>
            </ul>
        </section>        
    )
}

export default NavTab;