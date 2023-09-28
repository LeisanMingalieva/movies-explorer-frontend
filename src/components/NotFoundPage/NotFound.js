import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
    return (
      <main>
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link onClick={goBack} className="not-found__link">Назад</Link>
        </section>
      </main>                
    )
}

export default NotFound;