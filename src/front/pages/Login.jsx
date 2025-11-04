import { useState } from "react";
import { login } from "../APIServices.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      navigate("/private");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Introduce tu correo"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Introduce tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta?{" "}
          <a href="/signup" className="text-decoration-none">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
