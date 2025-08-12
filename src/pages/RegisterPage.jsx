import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";
import Swal from "sweetalert2";

function RegisterPage() {
  const { handlerAddUser, users } = useUsersContext();  // usamos contexto global
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const getNextId = () => {
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map((u) => u.id));
    return maxId + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificamos si el email ya está registrado
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      Swal.fire(
        "Error en Email !!",
        "Ya existe un usuario con ese correo electrónico.",
        "error"
      );
      return;
    }

    // Creamos nuevo usuario
    const newUser = {
      id: getNextId(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: formData.password
    };

    handlerAddUser(newUser);

    localStorage.setItem("activeUser", JSON.stringify(newUser));

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cyan-950">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu apellido"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
