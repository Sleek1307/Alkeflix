import React from 'react';
import { Link } from 'react-router-dom';

import Buscador from './Buscador';

export default function Header(props) {

  const { favoritesAmount } = props;

  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to={'/'}>AlkeFlix</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className="collapse navbar-collapse" id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to={'/inicio'}>Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link position-relative' to={'/favoritos'}>
                  Favoritos
                  {favoritesAmount > 0 && <span className='position-absolute translate-middle badge rounded-pill bg-danger'>{favoritesAmount}</span>}
                </Link>
              </li>
            </ul>
          </div>
          <Buscador />
        </div>
      </nav>
    </header>
  )
}
