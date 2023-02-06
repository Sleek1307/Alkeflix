import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const password = e.target.password.value;

    if (email === "" || password === "") {
      swal("Algo anda mal", "Los campos no pueden estar vacios", "error");
      return;
    }

    if (email !== "" && !emailRegex.test(email)) {
      swal("Algo anda mal", "Ingresa un correo electronico valido", "error");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swal(
        "Algo anda mal",
        "Correo electronico o contraseña incorrecta",
        "error"
      );
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal("Perfecto", "Ingresaste correctamente", "success");
        const tokenRecived = res.data.token;
        sessionStorage.setItem("token", tokenRecived);
        navigate("/inicio");
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to={"/inicio"} />}
      <form
        onSubmit={submitHandler}
        className="w-100 h-100 d-flex justify-content-center align-items-center"
      >
        <div className="d-flex flex-column align-items-center justify-content-center card p-4 m-4">
          <h2>Inicio de sesión</h2>
          <label className="form-label" htmlFor="">
            <span>Correo electronico</span>
            <input className="form-control" type="text" name="email" />
          </label>
          <label className="form-label" htmlFor="">
            <span>Contraseña</span>
            <input className="form-control" type="password" name="password" />
          </label>
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
}
