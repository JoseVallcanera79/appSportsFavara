// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [user, setUser] = useState(null) // <--- ESTO te faltaba
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("activeUser"))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const logOut = () => {
    // 1. Eliminar datos de sesión (token, usuario, etc.)
    localStorage.removeItem("activeUser");

    // 2. Redirigir al login
    navigate("/login");
  };

  return (
    <div className="w-full bg-cyan-900 text-amber-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-[18px] font-bold text-center md:text-left">
          {user ? `Bienvenido \u00A0 ${user.nombre} ${user.apellido}` : "Bienvenido"}
        </div>
        <div className='bg-red-600 rounded-lg p-2 text-center cursor-pointer' onClick={logOut}>Cerrar Sesion</div>

        <ul className="flex justify-center md:justify-end space-x-8 text-white bg-cyan-600 px-4 py-2 rounded-lg">
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/reservas">Reservar</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/perfil">Mi perfil</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link to="/misreservas">MisReservas</Link>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Navbar
