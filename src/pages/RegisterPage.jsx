import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

function RegisterPage() {
  const { handlerAddUser, users } = useUsersContext();
  const { login } = useAuth();
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      Swal.fire("Error", "Ya existe un usuario con ese correo.", "error");
      return;
    }

    const hashedPassword = await hashPassword(formData.password);

    const newUser = {
      id: getNextId(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: hashedPassword,
      rol: formData.email === "admin@admin.com" ? "admin" : "user"
    };

    handlerAddUser(newUser);

    // login automático
    login(newUser);

    navigate(newUser.rol === "admin" ? "/usersList" : "/misreservas");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cyan-950">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
