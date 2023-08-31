import React from "react";
import './Portfolio.css';
import Link from '../../../images/strelka.svg'

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__items">
                    <li className="portfolio__item">
                        Статичный сайт
                        <a href="https://github.com/LeisanMingalieva/how-to-learn" rel="noreferrer" target="_blank"><img className="portfolio__link" src={Link} alt="Ссылка на одностраничный сайт" /></a>
                    </li>
                    <li className="portfolio__item">
                        Адаптивный сайт
                        <a href="https://leisanmingalieva.github.io/russian-travel" rel="noreferrer" target="_blank"><img className="portfolio__link" src={Link} alt="Ссылка на одностраничный сайт" /></a>
                    </li>
                    <li className="portfolio__item">
                        Одностраничное приложение
                        <a href="https://mesto-andriyanova.nomoredomains.xyz/sign-in" rel="noreferrer" target="_blank"><img className="portfolio__link" src={Link} alt="Ссылка на одностраничный сайт" /></a>
                    </li>
                </ul>
        </section>        
    )
}

export default Portfolio;