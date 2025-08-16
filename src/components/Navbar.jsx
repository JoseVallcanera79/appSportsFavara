import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("activeUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const logOut = () => {
    localStorage.removeItem("activeUser");
    navigate("/login");
  };

  if (!user) return null; // No mostramos navbar si no hay usuario

  return (
    <div className="w-full bg-cyan-900 text-amber-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-[18px] font-bold text-center md:text-left">
          Bienvenido {user.nombre} {user.apellido}
        </div>

        <div className="bg-red-600 rounded-lg p-2 text-center cursor-pointer" onClick={logOut}>
          Cerrar Sesión
        </div>

        <ul className="flex justify-center md:justify-end space-x-8 text-white bg-cyan-600 px-4 py-2 rounded-lg">
          {/* Enlaces comunes para todos */}
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/reservas">Reservar</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/perfil">Mi perfil</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/misreservas">MisReservas</Link>
          </li>

          {/* Enlace extra solo para admin */}
          {user.rol === "admin" && (
            <li className="hover:text-cyan-300 cursor-pointer text-amber-300">
              <Link to="/usersList">Usuarios</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
