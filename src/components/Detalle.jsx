import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Detalle() {

  const query = new URLSearchParams(window.location.search);

  const [movieData, setMovieData] = useState(null);

  const movieId = query.get('movieId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!movieData) {
      const apiKey = 'e3c2cca8dcb273b5e674f40415045ef9';
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`).then(
        (response) => {
          setMovieData(response.data);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    };
  }, []);

  return (
    <>

      {movieData &&
        <div className='w-100 d-flex justify-content-center'>
          <div className='row w-75'>
            <div className="col-4">
              <img src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`} className="card-img-top" alt={movieData?.title} />
            </div>
            <div className="col-8 border rounded  ">
              <h1>{movieData?.original_title}</h1>
              <h4 className='text-secondary'>{movieData?.title}</h4>
              <p className='mb-0'>
                <span className='text-dark fw-bold'>Fecha de estreno:</span>
                <span className='text-dark fst-italic'>{' ' + movieData?.release_date}</span>
              </p>
              <p>{movieData.overview}</p>
              <p>
                <span className='text-dark fw-bold'>Generos: </span>
                {
                  movieData?.genres?.map((gender, index) => {
                    return (
                      <span className='badge bg-secondary fst-italic mx-1' key={index}>{gender?.name}</span>
                    )
                  })
                }
              </p>
              {/* <p>Genero:Accion Aventura Fantasía</p>
            <p>Actores: John Doe John Doe John Doe</p> */}
            </div>
          </div>
        </div>
      }
    </>
  )
}
