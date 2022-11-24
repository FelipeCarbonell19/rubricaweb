import React, {useState, useEffect} from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Tareas from "./Tareas";

const Admin = () => {
  const navegate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe el usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe el usuario");
      navegate("/login");
    }
  }, [navegate]);

  return (
    <div>
      {user && <Tareas user={user} />}
    </div>
  )
};

export default Admin;
