// import { useState } from 'react';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Header from '../Header';
// import Movies from '../Movies/Movies';
// import Footer from "../Footer/Footer";
// import Main from "../Main/Main";
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Profile from '../Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="page">
      {/* <Routes>
        <Route path="/" element={<Main />} />
      </Routes> */}
      {/* <Main />
      <Footer /> */}
      {/* <Register buttonText="Зарегистрироваться"/> */}
      {/* <Login buttonText="Войти"></Login> */}
      {/* <Profile name="Виталий"/> */}
      <SearchForm />
    </div>
  );
}

export default App;
