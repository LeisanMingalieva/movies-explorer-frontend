import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import "./AuthForm.css"

const AuthForm = ({
    helloText,
    formName,
    children,
    buttonText,
    loggedText,
    path,
    signLinkText,
    isValid,
    onSubmit
}) => {
    const buttonClassName = `auth__button auth__button_type_${formName} ${isValid ? "" : "auth__button_disabled"}`
    return (
        <section className="auth">
            <Link to="/" className="auth__logo" src={logo} alt="Логотип"></Link>
            <h1 className="auth__title">{helloText}</h1>
            <form onSubmit={onSubmit} className="auth__form" name={formName} id="auth__form">                    
                { children }  
                <div className="auth__button-container">
                    <button
                        disabled={!isValid}
                        className={buttonClassName}
                        type="submit"
                        form="auth__form"
                    >
                        {buttonText}
                    </button>
                <p className="auth__button-text">{loggedText}
                    <Link to={path} className="auth__login-link">{signLinkText}</Link> 
                </p>                       
                </div>
            </form>        
        </section>
    )
}

export default AuthForm;