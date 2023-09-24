import "./InputForm.css";
import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE } from "../../utils/constants";


const EmailInput = ({
    type,
    title,
    inputName,
    register,
    errors,
    placeholder,
    defaultValue,
}) => {
    return (
        <>
            <label className="input__label">{inputName}</label>
            <input
                {...register("email", {
                    required: "Поле email должно быть заполнено",
                    minLength: {
                        value: 2,
                        message: "Минимум 2 символов",
                    },
                    maxLength: {
                        value: 40,
                        message: "Электронная почта должна содержать не более 40 символов",
                    },
                    pattern: {
                        value: EMAIL_REGEX,
                        message: INVALID_EMAIL_MESSAGE,
                    },
                })}
                id={`${title}-input`}      
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}    
                className="input__form"  
            />
            <span className="input__span input__span-error_visible">
                {errors?.[title] && <div>{errors?.[title]?.message}</div>}                
            </span>
        </>

    )    
}

export default EmailInput;
