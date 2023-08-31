import React from "react";
import './AboutMe.css';
import StudentPhoto from '../../../images/studentPhoto.jpg'

function AboutMe() {
    return (
        <section className="about" id='student'>
            <h2 className="about__title">Студент</h2>
            <div className="about__content">
                <div className="about__description">
                    <h3 className="about__name">Виталий</h3>
                    <p className="about__job">Фронтенд-разработчик, 30 лет</p>
                    <p className="about__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="about__link" href="https://github.com/LeisanMingalieva" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about__photo" src ={StudentPhoto} alt="Фото студента"/>
            </div>
        </section>        
    )
}

export default AboutMe;