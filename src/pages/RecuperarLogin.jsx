// pages/RecuperarLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { hashPassword } from "../utils/hashPassword";

function RecuperarLogin() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      Swal.fire("Error", "Completa todos los campos", "error");
      return;
    }

    // Obtener usuarios
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) {
      Swal.fire("Error", "No existe un usuario con ese correo", "error");
      return;
    }

    // Reemplazar contraseña con la nueva (hasheada)
    const hashed = await hashPassword(newPassword);
    users[userIndex].password = hashed;
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire("Éxito", "Contraseña actualizada. Ahora podrás iniciar sesión.", "success")
      .then(() => navigate("/login"));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cyan-950">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full border px-4 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Cambiar contraseña
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500">
          ¿Ya la recordaste?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RecuperarLogin;
