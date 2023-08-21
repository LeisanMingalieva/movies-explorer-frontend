import React from "react";
import './Footer.css';

function Footer() {
    return (
        <section className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>   
            <div className="footer__container">
                <p className="footer__date">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__links-container">
                        <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__links-container">
                        <a className="footer__link" href="https://github.com/LeisanMingalieva" target="_blank" rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </section>        
    )
}

export default Footer;