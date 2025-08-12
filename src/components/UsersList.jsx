import React from "react";
import { useUsers } from "../hooks/useUsers";
import UsersRow from "./UsersRow";
import { useReservas } from "../context/ReservaContext.jsx";

function UsersList() {
  const { users, handlerUserSelectedForm, handlerRemoveUser } = useUsers();
  const { reservas } = useReservas();

  // Función para obtener las reservas de un usuario (deporte "fronton" y "padel")
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
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No hay usuarios registrados.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
  <tr>
    <th className="px-4 py-2 text-left">ID</th><th className="px-4 py-2 text-left">Nombre</th><th className="px-4 py-2 text-left">Apellido</th><th className="px-4 py-2 text-left">Email</th><th className="px-4 py-2 text-left">Reservas</th><th className="px-4 py-2 text-left">Acciones</th>
  </tr>
</thead>

          <tbody>
            {users.map((user) => (
              <UsersRow
                key={user.id}
                user={user}
                reservas={getReservasDeUsuario(user.id)}  // paso las reservas
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
