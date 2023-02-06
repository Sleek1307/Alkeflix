import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Buscador() {

  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault();

    setKeyword(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim().length === 0) {
      swal('¡Error!', 'Tienes que escribir una palabra clave', 'error')
    } else if (keyword.trim().length < 4) {
      swal('¡Error!', 'Tienes que escribir mas de 4 caracteres', 'error')
    } else {
      navigate(`/resultados?keyword=${keyword.trim()}`);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='d-flex gap-3'>
        <input value={keyword} onChange={changeHandler} className='form-control' type="text" name="email" placeholder='Buscar peliculas ' />
        <button className='btn btn-primary' type='submit'>Buscar</button>
      </div>
    </form>
  )
}