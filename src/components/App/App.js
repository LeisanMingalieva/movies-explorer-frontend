// import { useState } from 'react';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Header from '../Header';
// import Movies from '../Movies/Movies';
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="page">
      {/* <Routes>
        <Route path="/" element={<Main />} />
      </Routes> */}
      <Main />
      <Footer />
    </div>
  );
}

export default App;
