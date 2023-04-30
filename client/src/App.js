import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.js';
import { Auth } from './pages/auth';
import { CreateMovie } from './pages/create-movieDes';
import { SavedMovies } from './pages/saved-movies';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-movie' element={<CreateMovie />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
