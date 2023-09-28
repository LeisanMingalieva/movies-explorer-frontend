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

export const LARGE_SIZE = 1280;
export const MEDIUM_SIZE = 989;
export const TABLET_SIZE = 768;

export const CARDS_SIZE_XL = 16;
export const CARDS_SIZE_L = 12;
export const CARDS_SIZE_M = 8;
export const CARDS_SIZE_S = 5;
export const SHORT_MOVIES = 40;