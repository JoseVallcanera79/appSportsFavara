import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [animate, setAnimate] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      Swal.fire("Error", "El correo es obligatorio.", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Swal.fire("Error", "Correo electrónico inválido.", "error");
      return;
    }
    if (!formData.password) {
      Swal.fire("Error", "La contraseña es obligatoria.", "error");
      return;
    }
    if (formData.password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === formData.email);

    if (!user || user.password !== formData.password) {
      Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
      return;
    }

    login(user); // Actualiza el contexto y guarda en localStorage

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Inicio de sesión exitoso",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/misreservas");
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cyan-950">
      <div className={`bg-white p-8 rounded-2xl shadow-lg w-80 max-w-md ${animate ? "animate-bounce" : ""}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          ¿No tenés una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
