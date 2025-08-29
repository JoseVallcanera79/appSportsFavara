import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

export const PerfilPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (!activeUser) {
      navigate("/login");
    } else {
      setUserData(activeUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) => (u.id === userData.id ? userData : u));

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activeUser", JSON.stringify(userData));

    Swal.fire("Perfil actualizado", "Los datos se guardaron correctamente", "success");
    navigate("/login");
  };

  return (
    <div className="bg-cyan-900 min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido centrado */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-5 rounded-2xl shadow-lg w-80 max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={userData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password || ""}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
