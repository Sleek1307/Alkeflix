import { Routes, Route } from 'react-router-dom';

//Componentes
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultados from './components/Resultados';

//Estilos
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css'
import Favoritos from './components/Favoritos';
import { useEffect, useState } from 'react';

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs');
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    };
  }, []);

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;
    if (favMovies === null) {
      tempMoviesInFavs = []
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    };

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imageUrl = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;

    const movieData = {
      imageUrl,
      title,
      overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
    } else {
      let movieIndex = tempMoviesInFavs.findIndex(oneMovie => oneMovie.id === movieIsInArray.id);
      tempMoviesInFavs.splice(movieIndex, 1);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
    };
  };

  return (
    <>
      <Header favoritesAmount={favorites.length} />
      <div className='container container-fluid mt-3'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/inicio' element={<Listado favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          <Route path='/detalle' element={<Detalle />} />
          <Route path='/resultados' element={<Resultados favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;