import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main'
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import './App.css';

function App() {
  

  return (
    <div className="page">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='movies' element={ <Movies /> } />
        <Route path='signup' element={ <Register buttonText='Зарегистрироваться'/> } />
        <Route path='signin' element={ <Login buttonText='Войти'/> } />
        <Route path='saved-movies' element={ <SavedMovies/ >} />
        <Route path='profile' element={ <Profile /> } />
        <Route path='*' element={ <NotFoundPage /> } />
      </Routes>
    </div>
  );
}

export default App;
