function UsersRow({ user, reservas, onDelete }) {
  const celdas = [
    user.id,
    user.nombre,
    user.apellido,
    user.email,
    reservas.length === 0 ? (
      <span key="sin-reservas" className="text-gray-500">Sin reservas</span>
    ) : (
      <ul key="reservas" className="list-disc list-inside">
        {reservas.map(({ fecha, hora, deporte }, i) => (
          <li key={i}>
            {deporte}: {fecha} {hora}
          </li>
        ))}
      </ul>
    ),
    <button
      key="btn-eliminar"
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => onDelete(user.id, user.nombre)}
    >
      Eliminar
    </button>,
  ];

  return (
    <tr>
      {celdas.map((celda, i) => (
        <td key={i} className="border px-4 py-2">{celda}</td>
      ))}
    </tr>
  );
}

export default UsersRow;
