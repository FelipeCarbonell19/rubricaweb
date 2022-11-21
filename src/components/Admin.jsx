import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Tareas from "./ListaTareas";

const Admin = () => {
  const navegate = useNavigate();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe el usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe el usuario");
      navegate("/login");
    }
  }, [navegate]);
  return <div>{user && <Tareas user={user} />}</div>;
};

export default Admin;
