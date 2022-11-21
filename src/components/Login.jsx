import React from "react";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [modoRegistro, setModoRegistro] = React.useState(true);
  const [email, setEmail] = React.useState("pipe@gmail.com");
  const [pass, setPass] = React.useState("lopez2001");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const guardarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      console.log("Ingrese Email");
      setError("Ingrese Email");
      return;
    }
    if (!pass.trim()) {
      console.log("Ingrese Password");
      setError("Ingrese Password");
      return;
    }
    if (pass.length < 6) {
      console.log("Password mayor a 6 caracteres");
      setError("Password de 6 caracteres o más");
      return;
    }

    setError(null);
    console.log("Correcto ...");
    if (modoRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);
      setEmail("");
      setPass("");
      setError(null);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass, navigate]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(res.user);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        id: res.user.uid,
      });
      await db.collection(res.user.uid).add();
      setEmail("");
      setPass("");
      setError(null);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no es valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Usuario ya existe");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña Incorrecta");
      }
    }
  }, [email, pass, navigate]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {modoRegistro ? "Registro" : "Iniciar Sesión"}
      </h3>
      <hr />
      <div className="row justify-content-center text-center">
        <div className="col-12 col-sm8 col-md-6 col-xl-4">
          <form onSubmit={guardarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button
              className="btn btn-outline-primary btn-lg w-100 mb-2"
              type="submit"
            >
              {modoRegistro ? "Registrarse" : "Ingresar"}
            </button>
            <button
              className="btn btn-outline-info btn-lg w-100 mb-2"
              onClick={() => setModoRegistro(!modoRegistro)}
              type="button"
            >
              {modoRegistro ? "Ingresar a su cuenta" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
