import "./InputForm.css";

const PasswordInput = ({
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
                {...register("password", {
                    required: "Поле Пароль должно быть заполнено",
                    minLength: {
                        value: 5,
                        message: "Минимум 5 символов",
                    },
                    maxLength: {
                        value: 40,
                    }
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

export default PasswordInput;