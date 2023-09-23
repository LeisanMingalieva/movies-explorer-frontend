import "./InputForm.css";

const NAME_REGEX = /^[a-zA-Zа-яА-Я\s-]*$/;

const NameInput = ({
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
                {...register("name", {
                    required: "Поле Имя должно быть заполнено",
                    minLength: {
                        value: 2,
                        message: "Поле должно содержать больше 2 символов",
                    },
                    maxLength: {
                        value: 40,
                        pattern: {
                            value: NAME_REGEX,
                            message: "Присутствуют недопустимые символы"
                        }
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

export default NameInput;