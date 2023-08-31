import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id='about-project'>
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__description">
                <ul className="about-project__content">
                    <li className="about-project__item">
                        <h3 className="about-project__item-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className="about-project__item">
                        <h3 className="about-project__item-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>                    
                </ul>
                <ul className="about-project__columns">
                    <li className="about-project__column about-project__column-first">
                        <h4 className="about-project__column-title about-project__column-title-first">1 неделя</h4>
                        <p className="about-project__column-text">Back-end</p>
                    </li>
                    <li className="about-project__column">
                        <h4 className="about-project__column-title">4 недели</h4>
                        <p className="about-project__column-text">Front-end</p>
                    </li>
                </ul>                
            </div>
        </section>        
    )
}

export default AboutProject;