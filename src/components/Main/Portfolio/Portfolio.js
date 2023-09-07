import React from "react";
import './Portfolio.css';
import Link from '../../../images/strelka.svg'

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__items">
                    <li className="portfolio__li">
                        <a  className="portfolio__item" href="https://github.com/LeisanMingalieva/how-to-learn" rel="noreferrer" target="_blank">
                            <p className="portfolio__link">Статичный сайт</p>
                            <img src={Link} alt="Ссылка на одностраничный сайт" />
                        </a>                        
                    </li>
                    <li className="portfolio__li">
                        <a  className="portfolio__item" href="https://leisanmingalieva.github.io/russian-travel" rel="noreferrer" target="_blank">
                            <p className="portfolio__link">Адаптивный сайт</p>
                            <img src={Link} alt="Ссылка на одностраничный сайт" />
                        </a>
                    </li>
                    <li className="portfolio__li">
                        <a className="portfolio__item" href="https://mesto-andriyanova.nomoredomains.xyz/sign-in" rel="noreferrer" target="_blank">
                            <p className="portfolio__link">Одностраничное приложение</p>
                            <img src={Link} alt="Ссылка на одностраничный сайт" />
                        </a>
                    </li>
                </ul>
        </section>        
    )
}

export default Portfolio;