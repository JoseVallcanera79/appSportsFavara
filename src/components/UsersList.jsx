import React from "react";
import { useUsers } from "../hooks/useUsers";
import UsersRow from "./UsersRow";
import { useReservas } from "../context/ReservaContext.jsx";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const { users, handlerRemoveUser } = useUsers();
  const { reservas } = useReservas();
  const navigate = useNavigate();

  const getReservasDeUsuario = (userId) => {
    const reservasUsuario = [];
    for (const deporte in reservas) {
      const resUserDeporte = reservas[deporte].filter((r) => r.userId === userId);
      resUserDeporte.forEach(r => reservasUsuario.push({ ...r, deporte }));
    }
    return reservasUsuario;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Usuarios</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-400 text-white px-3 py-1 rounded-full hover:bg-blue-500 transition flex items-center gap-1"
        >
          <span className="text-lg">←</span> Volver
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600">No hay usuarios registrados.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Apellido</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Reservas</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UsersRow
                key={user.id}
                user={user}
                reservas={getReservasDeUsuario(user.id)}
                onDelete={handlerRemoveUser}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;
