import React, {useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import * as MainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../utils/ProtectedRoute'

import './App.css';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  //получение данных пользователя с сервера
  useEffect(() => {
    if(loggedIn) {
      MainApi.getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.log)
    }
  }, [loggedIn]);

  //выход из системы
  function signOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }

  //регистрация пользователя
  const handleRegister = ({name, email, password}) => {
    MainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin', {replace: true})
      })
      .catch(console.log)
  };
  
  //авторизация пользователя
  const handleLogin = ({email, password}) => {
    MainApi
      .authorize({email, password})
      .then((data) => {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies');
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Проверка валидности токена
  const tokenCheck = () => {
    const token = localStorage.getItem("token")
      if (token) {
        MainApi.tokenCheck()
          .then(() => {
            setLoggedIn(true)
            navigate('/movies');
          })
      }
    }
  
    useEffect(() => {
      tokenCheck();
    }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='movies' element={ 
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Movies}
            />
           }/>
          <Route path='signup' element={ <Register handleRegister={handleRegister} buttonText='Зарегистрироваться'/> } />
          <Route path='signin' element={ <Login handleLogin={handleLogin} buttonText='Войти'/> } />
          <Route path='saved-movies' element={ 
            <ProtectedRoute
              loggedIn={loggedIn}
              element={SavedMovies}
            />
          } />
          <Route path='profile' element={ 
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Profile}
              onSignOut={signOut}
            />
          } />
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
