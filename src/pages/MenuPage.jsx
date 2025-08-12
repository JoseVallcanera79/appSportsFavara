import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useReservas } from "../context/ReservaContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Dialog } from "@headlessui/react";
import Navbar from "../components/Navbar.jsx";

function MenuPage() {
  const { usuario } = useAuth();
  const { reservas, ultimaReserva, setUltimaReserva, eliminarReserva } = useReservas();
  const [mostrarDialog, setMostrarDialog] = useState(false);

  // Filtrar reservas solo del usuario logueado
  const misReservasFronton = (reservas?.fronton || []).filter(
    (r) => r.userId === usuario?.id
  );
  const misReservasPadel = (reservas?.padel || []).filter(
    (r) => r.userId === usuario?.id
  );

  useEffect(() => {
    if (ultimaReserva) {
      setMostrarDialog(true);
      setTimeout(() => {
        setMostrarDialog(false);
        setUltimaReserva(null);
      }, 3000);
    }
  }, [ultimaReserva, setUltimaReserva]);

  const confirmarEliminar = (deporte, fecha, hora) => {
    Swal.fire({
      title: "¿Eliminar reserva?",
      text: `${deporte} - ${fecha} ${hora}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReserva(deporte, fecha, hora);
        Swal.fire("Eliminada", "Tu reserva ha sido eliminada", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-cyan-800 text-white">
      <Navbar />
      <div className="p-8"></div>

      <div className="text-2xl text-center p-4 pb-0">Mis Reservas</div>

      <div className="bg-blue-50 w-80 mt-4 pt-7 pb-12 text-center mx-auto rounded-2xl text-gray-800">
        {/* FRONTON */}
        <div className="fronton mb-8">
          <div className="p-2 text-2xl font-bold">Fronton</div>
          <table className="table text-[18px] w-full">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {misReservasFronton.map((reserva, index) => (
                <tr key={index} className="border bg-blue-100">
                  <td>{reserva.fecha}</td>
                  <td>{reserva.hora}</td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        confirmarEliminar("fronton", reserva.fecha, reserva.hora)
                      }
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {misReservasFronton.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-gray-500 py-4">
                    No tienes reservas de Fronton
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PADEL */}
        <div className="padel">
          <div className="p-2 text-2xl font-bold">Padel</div>
          <table className="table text-[18px] w-full">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {misReservasPadel.map((reserva, index) => (
                <tr key={index} className="border bg-blue-100">
                  <td>{reserva.fecha}</td>
                  <td>{reserva.hora}</td>
                  <td>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        confirmarEliminar("padel", reserva.fecha, reserva.hora)
                      }
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
              {misReservasPadel.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-gray-500 py-4">
                    No tienes reservas de Padel
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={mostrarDialog}
        onClose={() => setMostrarDialog(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 text-center shadow-lg max-w-sm w-full">
            <Dialog.Title className="text-xl font-bold text-green-700 mb-2">
              ¡Reserva confirmada!
            </Dialog.Title>
            <p className="text-gray-700">
              Has reservado <strong>{ultimaReserva?.deporte}</strong> el{" "}
              <strong>{ultimaReserva?.fecha}</strong> a las{" "}
              <strong>{ultimaReserva?.hora}</strong>.
            </p>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default MenuPage;
