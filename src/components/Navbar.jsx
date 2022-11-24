import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = (props) => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="d-flex justify-content-end navbar navbar-primary bg-primary">
      <div className="me-3">
        <Link to="/" className="btn btn-primary">
          Inicio
        </Link>
        {props.firebaseUser !== null ? (
          <Link to="/admin" className="btn btn-primary">
            Admin
          </Link>
        ) : null}
        {props.firebaseUser !== null ? (
          <button
            className="btn btn-primary"
            onClick={() => cerrarSesion()}
          >
            Cerrar Sesion
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
