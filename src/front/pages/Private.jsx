import { useEffect, useState } from "react";
import { validateToken } from "../APIServices.js";
import { useNavigate } from "react-router-dom";

export default function Private() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    validateToken(token).then((res) => {
      if (!res.valid) navigate("/login");
      else setUser(res.user);
    });
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow text-center" style={{ maxWidth: "500px", width: "100%" }}>
        {user ? (
          <>
            <h2 className="mb-3">Bienvenido, {user.email}</h2>
            <p className="text-muted">Tu sesión es válida 🔒</p>
            <button onClick={logout} className="btn btn-danger w-100 mt-3">
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}
