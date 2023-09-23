import React from "react";
//import successIcon from '../../images/succesIcon.png';
//import failIcon from '../../images/failIcon.png';
import './InfoToolTip.css'

// function InfoToolTip ({ registrated, isOpen, onClose, successTitle, failTitle, handleOverlayClick }) {
//     return (
//     <section className= {`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick} aria-label="Изображение">
//         <div className="popup__content">
//           <button type="button" className="popup__close" onClick={onClose} />
//           {registrated ? (
//             <>
//             <img className="popup__tooltip-img" alt="Успешная регистрация" src={failIcon} />
//             <p className="popup__tooltip-text">{failTitle}</p>
//             </>    
//           ) : (
//             <>
//             <img className="popup__tooltip-img" alt="Неуспешная регистрация" src={successIcon} />
//             <p className="popup__tooltip-text">{successTitle}</p>
//             </> 
//           )}
//         </div>
//     </section>
//     )
// };

function InfoToolTip ({ isOpen, onClose, handleOverlayClick, errorMessage }) {
  return (
  <section className= {`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick} aria-label="Изображение">
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} />
        <p className="popup__tooltip-text">{errorMessage}</p>
      </div>
  </section>
  )
};
export default InfoToolTip;