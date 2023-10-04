import React, {useEffect, useState} from 'react';
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
import * as MoviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { CONFLICT_ERROR, UNAUTHORIZATED_ERROR, SHORT_MOVIES } from '../../utils/constants';
import { moviesFilterDuration } from '../../utils/moviesFilter'
import './App.css';


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", _id: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);  
  const [isPreloader, setIsPreloader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]); 
  const [allSavedMovies, setAllSavedMovies] = useState([]); //все сохраненные фильмы
  const [shortMoviesCheckbox, setShortMoviesCheckbox] = useState(false); // состояние чекбокса на странице Фильмы
  const [savedShortMovies, setSavedShortMovies] = useState(false); // состояние чекбокса на странице Сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]); //стейт сохраненных фильмов
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();
  

  //проверяем наличие токена
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      MainApi
        .tokenCheck(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate(location.pathname, { replace: true });
        })
    }
    if (localStorage.getItem('shortMoviesCheckbox') === 'true') {
      setShortMoviesCheckbox(true);
    } else {
      setShortMoviesCheckbox(false);
    }
    getAllSavedMovies(); //получаем все сохраненные фильмы
    updatePreviosMovies(); // обновляем предыдущие
  }, [])

  useEffect(() => {
    updateAllSavedMovies(); //Обновляем все сохраненные 
    updateSavedMovies(); //обновляем сохраненные
  }, [allSavedMovies])

  //состояние чекбокса на странице Фильмы
  useEffect(() => {
    if(isLoggedIn && shortMoviesCheckbox) {
      const filteredShortMovies = JSON.parse(
        localStorage.getItem('filtered-short-movies')
      )
      filteredShortMovies !== null && updateSearchedMovies(filteredShortMovies)
    } else if (isLoggedIn && !shortMoviesCheckbox) {
      const filteredMovies = JSON.parse(
        localStorage.getItem('filtered-movies')
      )
      filteredMovies !== null && updateSearchedMovies(filteredMovies)
    }
  }, [shortMoviesCheckbox, isLoggedIn]);

  //состояние чекбокса на странице Сохраненные Фильмы
  useEffect(() => {
    if(isLoggedIn && savedShortMovies) {
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem('saved-filtered-short-movies')
      )
      if(savedFilteredShortMovies !== null) {
        savedFilteredShortMovies.length === 0 && setNotFound(true);
        setSavedMovies(savedFilteredShortMovies)
      } else setNotFound(true);
     } else if (isLoggedIn && !savedShortMovies) {
      const savedFilteredMovies = JSON.parse(
        localStorage.getItem('saved-filtered-movies')
      )
      savedFilteredMovies !== null && setSavedMovies(savedFilteredMovies)
    }
  }, [savedShortMovies, isLoggedIn])

  //удаляем при выходе из аккаунта все данные 
  useEffect(() => {
    if(location.pathname !== '/saved-movies') {
      localStorage.removeItem('saved-filtered-movies')
      localStorage.removeItem('saved-filtered-short-movies')
      localStorage.removeItem('savedShortMoviesCheckbox')
      setSavedShortMovies(false)
    } 
    else {
      updateSavedMovies();
    }
  }, [location]);


  //выход из системы
  function signOut () {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
    setSearchedMovies([]);
    setSavedMovies([]);
    setAllSavedMovies([]);
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
              getAllSavedMovies();
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

  function updatePreviosMovies() {
    const previousMovies = JSON.parse(localStorage.getItem('searched-movies'))
    previousMovies !== null 
    ? updateSearchedMovies(previousMovies)
    : setNotFound(true);
  }
  
  //обновляем найденные фильмы
  function updateSearchedMovies(movies) {
    if (movies.length) {
      setSearchedMovies(movies);
      localStorage.setItem('searched-movies', JSON.stringify(movies)); //сохраняем в локалсторадж обновленные данные 
    } else {
      setSearchedMovies([]);
      setNotFound(true);
    }
  }

  //поиск фильмов
  function handleSearchMovie(movieToSearch) {
    if(!movieToSearch) {
      setIsInfoTooltipOpen(true);
      setErrorMessage('Нужно ввести ключевое слово');
    } else {
      setNotFound(false)
      localStorage.removeItem('searched-movies');
      setSearchedMovies([]);
      setIsPreloader(true);
      MoviesApi
        .getMovies() //получаем фильмы из Базы данных
        .then((movies) => {          
          const filteredMovies = movies.filter(
            (movie) => 
              movie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase()) //фильтр по критериям поиска 
          );
          localStorage.setItem(
            'filtered-movies',
            JSON.stringify(filteredMovies) //сохраняем в локалсторадж фильмы, соответствующие критерию поиска
          );
          localStorage.setItem(
            'movie-to-search',
            JSON.stringify(movieToSearch) //критерий поиска
          );
          const filteredShortMovies = moviesFilterDuration(filteredMovies);
          localStorage.setItem(
            'filtered-short-movies',
            JSON.stringify(filteredShortMovies) //сохраняем в локалсторадж фильмы короткометражки
          );
          if(shortMoviesCheckbox) {
            updateSearchedMovies(filteredShortMovies)
          } else {
            updateSearchedMovies(filteredMovies)
          };
        })
        .catch((err) => {
          setIsInfoTooltipOpen(true)
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsPreloader(false);
        })
    }
  }

  //работа с чекбоксом
  function handleChooseShortMovies(movieToSearch) {
    if (location.pathname === "/movies") { //на странице Фильмы
      if (movieToSearch) {
        setShortMoviesCheckbox(!shortMoviesCheckbox);
        localStorage.setItem("shortMoviesCheckbox", !shortMoviesCheckbox);
      }
        setShortMoviesCheckbox(!shortMoviesCheckbox);
        localStorage.setItem("shortMoviesCheckbox", !shortMoviesCheckbox);
      }      
        
    if (location.pathname === "/saved-movies") { //на странице Сохраненные фильмы
      const savedFilteredShortMovies = JSON.parse(
        localStorage.getItem("saved-filtered-short-movies") //получаем из локалсторадж сохраненные короткометражки
      );
      const savedMoviesArray = JSON.parse(
        localStorage.getItem("allSavedMovies") //получаем из локалсторадж сохраненные фильмы
      );
      if (savedMoviesArray.length === 0) {
        setIsInfoTooltipOpen(true);
        setErrorMessage("Нет сохраненных фильмов");
      } else {
        setSavedShortMovies(!savedShortMovies);
        if (!savedFilteredShortMovies) {
          localStorage.setItem("savedShortMoviesCheckbox", !savedShortMovies);
          const savedShortMoviesArray = savedMoviesArray.filter(
            (movie) => movie.duration <= SHORT_MOVIES
          );
          if (!savedShortMovies) {
            setSavedMovies(savedShortMoviesArray);
          } else {
            setSavedMovies(savedMoviesArray);
          }
        }
      }
    }
  }

  //получаем сохраненные фильмы
  function getAllSavedMovies() {
    MainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setAllSavedMovies(res);
        localStorage.setItem('allSavedMovies', JSON.stringify(res)); //сохраняем в локалсторадж
      
      })
      .catch((err) => console.log(err))
  }

  //добавление фильмов в Сохраненные
  function handleSaveMovie(movie) {
    MainApi
      .saveMovie(movie)
      .then((res) => {
        setAllSavedMovies([...allSavedMovies, res]);
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setErrorMessage("При сохранении фильма произошла ошибка.");
      });
  }

  //удаление фильмов из массива сохраненных на странице Фильмы
  function getMovieToDeleteId(movie) {
    const localSavedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    if (localSavedMovies) {
      return localSavedMovies.find(
        (movieItem) => movieItem.movieId === movie.id
      );
    }
  }

  //удаление фильма на странице Сохраненные
  function handleDeleteMovie(movie) {
    MainApi
      .deleteMovie(movie._id)
      .then(() => {
        setAllSavedMovies((state) =>
        state.filter((savedMovie) => savedMovie._id !== movie._id)
        ); 
        setSavedMovies((state) =>
        state.filter((savedMovie) => savedMovie._id !== movie._id))       
        localStorage.removeItem('saved-filtered-short-movies')
        localStorage.removeItem('saved-filtered-movies')
      })
      //.then(() => {       
      // const movieToSearch = JSON.parse(
      //   localStorage.getItem('movie-to-search')
      // )
      // setAllSavedMovies((state) => {
      //   const res = state.filter((savedMovie) => {
      //     const hasMovieToSearch = movieToSearch ? (savedMovie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
      //     savedMovie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())) : false
      //     return hasMovieToSearch || savedMovie._id !== movie._id
      //   })
      //   return res
      // })
      // localStorage.removeItem('saved-filtered-short-movies')
      // localStorage.removeItem('saved-filtered-movies')
      // })
      .catch(() => {
      setIsInfoTooltipOpen(true);
      setErrorMessage("При удалении фильма произошла ошибка.");
    });
  }

  //проверяем есть в сохраненных фильмы 
  const isSaved = (movie) => {
    return allSavedMovies.some((movieItem) => movieItem.movieId === movie.id);
  };

  //обновляем статус фильма. если не сохранен сохраняем, если не сохранен сохраняем
  function updateMovieStatus(movie) {
    if (!isSaved(movie)) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(getMovieToDeleteId(movie));
    }
  }
 
  //закрытие попапа
  function closePopup() {
    setIsInfoTooltipOpen(false)
  }

  //поиск на странице Сохраненных фильмов
  function handleSearchSavedMovie(movieToSearch) {
    if (!movieToSearch) {
      setIsInfoTooltipOpen(true);
      setErrorMessage("Нужно ввести ключевое слово");
    } else {
      setNotFound(false);

      const localSavedMovies = JSON.parse(
        localStorage.getItem("allSavedMovies")
      );
      const savedSearchedMovies = localSavedMovies.filter( //фильтруем фильмы, соответствующие критерию поиска
        (movie) =>
          movie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase())
      );

      localStorage.setItem(
        "saved-filtered-movies",  //сохраняем в локал сторадж фильмы, соответствующие критерию поиска
        JSON.stringify(savedSearchedMovies)
      );
      const savedSearchedShortMovies = moviesFilterDuration(savedSearchedMovies)
      localStorage.setItem(
        "saved-filtered-short-movies", //сохраняем в локал сторадж короткометражные фильмы, соответствующие критерию поиска 
        JSON.stringify(savedSearchedShortMovies)
      );
      if (savedShortMovies) { 
        setSavedMovies(savedSearchedShortMovies); //устанавливаем короткометражки, соответствующие критерию поиска 
        savedSearchedShortMovies.length === 0 && setNotFound(true); //ничего не найдено
      } else {
        setSavedMovies(savedSearchedMovies); //устанавливаем все фильмы, соответствующие критерию поиска
        savedSearchedMovies.length === 0 && setNotFound(true);
      }
    }
  }

  //обновление сохраненных фильмов
  function updateSavedMovies() {
    //рабочий наполовину    
    // if (savedShortMovies) {
    //   const filteredSavedShortMovie = moviesFilterDuration(localSavedMovies)
    //   setSavedMovies(filteredSavedShortMovie)
    // } else {
    //   setSavedMovies(localSavedMovies)
    // }
    const localSavedMovies = JSON.parse(localStorage.getItem('allSavedMovies'));
    const movieToSearch = JSON.parse(localStorage.getItem('movie-to-search'));
    if (savedShortMovies) {
      setSavedMovies((state) => {
        const res = state.filter((savedMovie) => {
          const hasMovieToSearch = movieToSearch 
          ? (savedMovie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) 
          || savedMovie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase()))
          : false
          return hasMovieToSearch || localSavedMovies
        })
        return res
      })
    } else {
      setSavedMovies((state) => {
        const res = state.filter((savedMovie) => {
          const hasMovieToSearch = movieToSearch 
          ? (savedMovie.nameRU.toLowerCase().includes(movieToSearch.toLowerCase()) 
          || savedMovie.nameEN.toLowerCase().includes(movieToSearch.toLowerCase()))
          : true
          return hasMovieToSearch || localSavedMovies
        })
        return res
      })
    }
      
  };
  
  function updateAllSavedMovies() {
    localStorage.setItem('allSavedMovies', JSON.stringify(allSavedMovies))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={isLoggedIn}/>} />
          <Route path='movies' element={ 
            <ProtectedRoute
              element={Movies}
              loggedIn={isLoggedIn}
              onChooseShortMovies={handleChooseShortMovies}
              shortMoviesCheck={shortMoviesCheckbox}
              notFound={notFound}
              moviesArray={searchedMovies}
              isPreloader={isPreloader}
              onSearchMovie={handleSearchMovie}
              onSaveMovie={updateMovieStatus}
              isSaved={isSaved}              
            />
           }/>
          <Route path='signup' element={ 
            <Register handleRegister={handleRegister} loggedIn={isLoggedIn} /> 
          }/>
          <Route path='signin' element={ 
            <Login handleLogin={handleLogin} loggedIn={isLoggedIn}/> 
          }/>
          <Route path='saved-movies' element={ 
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={isLoggedIn}
              onChooseShortMovies={handleChooseShortMovies}
              savedShortMoviesCheck={savedShortMovies}
              notFound={notFound}
              onSearchMovie={handleSearchSavedMovie}
              deleteMovie={handleDeleteMovie}
              savedMoviesArray={savedMovies}
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
