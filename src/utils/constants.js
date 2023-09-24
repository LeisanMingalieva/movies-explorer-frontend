export const moviesUrl = 'https://api.nomoreparties.co';   

export const BASE_URL = 'https://api.movies-andriyanova.nomoreparties.co';

export const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
export const INVALID_EMAIL_MESSAGE = `В адресе электронной почты должен присутствовать символ '@' и минимум 2 символа`;
export const NAME_REGEX = /^[a-zA-Zа-яА-Я\s-]*$/;
export const UNAUTHORIZATED_ERROR = {
    status: 401,
    errorText: 'Неверный логин или пароль'
};

export const CONFLICT_ERROR = {
    status: 409,
    errorText: 'Пользователь с таким e-mail уже существует'
};