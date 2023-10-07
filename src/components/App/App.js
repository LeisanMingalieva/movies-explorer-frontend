import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import * as MainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CONFLICT_ERROR, UNAUTHORIZATED_ERROR } from '../../utils/constants';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", _id: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);  
  const [savedMoviesList, setSavedMoviesList] = useState([]); //стейт сохраненных фильмов
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    isLoggedIn && Promise.all([MainApi.getSavedMovies(), MainApi.getUserData()])
      .then(([savedMovie, userData]) => {
        setSavedMoviesList(savedMovie.reverse());
        setCurrentUser(userData)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`)
      })
  }, [isLoggedIn])

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      MainApi.tokenCheck(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(path);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("all-movies");
    localStorage.removeItem("filtered-movies");
    localStorage.removeItem("saved-movies");
    localStorage.removeItem("movie-to-search");
    localStorage.removeItem("movie-checkbox-status");
    navigate("/");
    setIsLoggedIn(false);
  }

  //регистрация пользователя
  const handleRegister = ({name, email, password}) => {
    MainApi
      .register({name, email, password})
      .then(() => {   
        handleLogin({ email, password });
      })
      .catch((err) => {
        setErrorMessage(
          err === CONFLICT_ERROR.status
          ? CONFLICT_ERROR.errorText
          : 'При регистрации пользователя произошла ошибка'
        )
        setIsInfoTooltipOpen(true);
      })
  };
  
  //авторизация пользователя
  const handleLogin = ({ email, password }) => {
    MainApi
      .authorize({ email, password })
      .then((data) => {
          localStorage.setItem('token', data.token)
          MainApi
            .tokenCheck(data.token)
            .then((data) => {
              setCurrentUser(data);
              setIsLoggedIn(true);
              navigate('/movies');
            })
            .catch((err) => {
              setErrorMessage(
                err === UNAUTHORIZATED_ERROR.status
                ? UNAUTHORIZATED_ERROR.errorText
                : 'При авторизации произошла ошибка'
              )
              setIsInfoTooltipOpen(true)
            })
      })
      .catch((err) => {
        setErrorMessage(
          err === UNAUTHORIZATED_ERROR.status
          ? UNAUTHORIZATED_ERROR.errorText
          : 'При авторизации произошла ошибка'
        )
        setIsInfoTooltipOpen(true);
      })
  }

  //обновление профиля пользователя
  const handleUpdateProfile = ({ name, email }) => {
    MainApi
      .updateUser({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setIsInfoTooltipOpen(true);  
        setErrorMessage('Профиль успешно обновлен')      
      })        
      .catch((err) => {
        setErrorMessage(
          err === CONFLICT_ERROR.status
          ? CONFLICT_ERROR.errorText
          : 'При обновлении профиля произошла ошибка'
        )
        setIsInfoTooltipOpen(true);
      })
  }

  //сохранение фильмов
  function handleMovieLikeStatus(movie) {
    MainApi
      .saveMovie(movie)
      .then((res) => { 
        setSavedMoviesList([...savedMoviesList, res]);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setErrorMessage("При сохранении фильма произошла ошибка.");
      });
  }

  //удаление фильмов
  function handleDeleteMovie(movie) {
    MainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter((m) => m._id !== movie._id));
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
      setErrorMessage("При удалении фильма произошла ошибка.");
      });
  }  

  //закрытие попапа
  function closePopup() {
    setIsInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={isLoggedIn}/>} />
          <Route path='signup' element={ 
            <Register handleRegister={handleRegister} loggedIn={isLoggedIn} /> 
          }/>
          <Route path='signin' element={ 
            <Login handleLogin={handleLogin} loggedIn={isLoggedIn}/> 
          }/>
          <Route path='movies' element={ 
            <ProtectedRoute
              element={Movies}
              loggedIn={isLoggedIn}
              savedMovies={savedMoviesList}
              handleMovieLikeStatus={handleMovieLikeStatus}
              handleDeleteMovie={handleDeleteMovie}
            />
           }/>
          <Route path='saved-movies' element={ 
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={isLoggedIn}              
              savedMovies={savedMoviesList}
              handleDeleteMovie={handleDeleteMovie}
            />
          } />
          <Route path='profile' element={ 
            <ProtectedRoute
              element={Profile}
              loggedIn={isLoggedIn}
              onSignOut={signOut}
              handleUpdateProfile={handleUpdateProfile}
            />
          }/>      
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
        <InfoToolTip
          errorMessage={errorMessage}
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
