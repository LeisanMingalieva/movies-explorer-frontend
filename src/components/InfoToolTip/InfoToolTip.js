import React from "react";
import './InfoToolTip.css'

function InfoToolTip ({ isOpen, onClose, errorMessage }) {
  return (
  <section className= {`popup ${isOpen ? 'popup_opened' : ''}`} aria-label="Изображение">
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} />
        <p className="popup__tooltip-text">{errorMessage}</p>
      </div>
  </section>
  )
};
export default InfoToolTip;