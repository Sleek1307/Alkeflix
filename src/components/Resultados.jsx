import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

export default function Resultados() {
  const location = useLocation();

  const [movieResponse, setMovieResponse] = useState([]);
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');

  useEffect(() => {
    const apiKey = 'e3c2cca8dcb273b5e674f40415045ef9';
    const apiUri = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${keyword}`;

    axios.get(apiUri).then(response => {

      if (response.data.results.length === 0) {
        swal('Algo no ha ido del todo bien', 'No encontramos resultados para tu busqueda', 'warning')
      }

      setMovieResponse(response.data.results);
    })
  }, [query]);

  return (
    <>
      <h2>Resultados de: <span className='fst-italic'>{keyword}</span></h2>
      <div className="row">
        {movieResponse.length === 0 && <h3 className='text-center'>No encontramos resultados para tu busqueda</h3>}
        {movieResponse.map((movie, index) => {
          return (
            <div className="col-12 col-md-4 col-sm-6  my-4 d-flex justify-content-center" key={index}>
              <div className="card" style={{ width: '18rem' }}>
                {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />}
                <div className="card-body h-50 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title" >{movie.title}</h5>
                    <p className="card-text overflow-hidden">{movie.overview.split('').length <= 200 ? movie.overview : movie.overview.substring(0, 100).trim() + '...'}s</p>
                  </div>
                  <Link to={`/detalle?movieId=${movie.id}`} className="btn btn-primary mt-3">Go somewhere</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>

  )
}