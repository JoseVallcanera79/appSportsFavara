import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog } from "@headlessui/react";
import { es } from "date-fns/locale";
import { useReservas } from "../context/ReservaContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";  // <-- añadir
import { useNavigate } from "react-router-dom"
import { isDayDisabled } from "../hooks/reservaAgosto.js";

const generarHoras = (fechaSeleccionada, reservasDeporte) => {
  const horas = [];
  let inicio = 9;
  while (inicio < 21) {
    const horasEnteras = Math.floor(inicio);
    const minutos = (inicio % 1) * 60;
    const horaTexto = `${horasEnteras.toString().padStart(2, "0")}:${minutos === 0 ? "00" : "30"}`;
    horas.push(horaTexto);
    inicio += 1.5;
  }

  const ahora = new Date();
  const hoy = ahora.toDateString();
  const fechaSelString = fechaSeleccionada.toDateString();

  return horas.map((hora) => {
    const dia = fechaSeleccionada.getDate().toString().padStart(2, "0");
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaSeleccionada.getFullYear().toString().slice(2);
    const fechaStr = `${dia}-${mes}-${anio}`;

    const reservasEnHora = reservasDeporte.filter(
      (reserva) => reserva.fecha === fechaStr && reserva.hora === hora
    );

    let esPasada = false;
    if (fechaSelString === hoy) {
      if (parseInt(hora.split(":")[0]) < ahora.getHours()) esPasada = true;
      if (parseInt(hora.split(":")[0]) === ahora.getHours() && parseInt(hora.split(":")[1]) <= ahora.getMinutes())
        esPasada = true;
    }

    return { hora, reservasEnHora, esPasada };
  });
};

function ReservaCalendario({ deporte }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { agregarReserva, reservas } = useReservas();
  const { usuario } = useAuth(); // <-- usuario activo
  const navigate = useNavigate();

  const manejarSeleccion = (fecha) => {
    setFechaSeleccionada(fecha);
    setModalAbierto(true);
  };

  const manejarHora = (hora) => {
    if (!usuario) return alert("Debes iniciar sesión");
    const fechaLocal = new Date(fechaSeleccionada);
    const fechaStr = `${fechaLocal.getDate().toString().padStart(2, "0")}-${(fechaLocal.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${fechaLocal.getFullYear().toString().slice(2)}`;

    agregarReserva(deporte, fechaStr, hora);
    setModalAbierto(false);
    navigate("/misreservas");
  };

  const reservasDeporte = reservas[deporte] || [];
  const horas = fechaSeleccionada ? generarHoras(fechaSeleccionada, reservasDeporte) : [];

  return (
    <div className="flex flex-col items-center space-y-3">
      <h1 className="text-[15px] font-bold mb-4">Selecciona una fecha</h1>

      <DatePicker
        selected={fechaSeleccionada}
        onSelect={(fecha) => {
          // siempre abre el modal aunque se seleccione la misma fecha
          setFechaSeleccionada(fecha);
          setModalAbierto(true);
        }}
        onChange={manejarSeleccion}
        minDate={new Date()}
        inline
        locale={es}
        calendarClassName="bg-white rounded-md shadow-md w-full"
        filterDate={(date) => !isDayDisabled(date)} // Aquí aplicas el filtro para deshabilitar sábados y domingos de agosto
      />

      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-80">
            {/* Fecha seleccionada arriba */}
            {fechaSeleccionada && (
              <p className="text-center text-sm mb-2 text-gray-600">
                {fechaSeleccionada.toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}

            <Dialog.Title className="text-lg font-bold mb-4">Selecciona una hora</Dialog.Title>
            <ul className="grid grid-cols-2 gap-2">
              {horas.map(({ hora, reservasEnHora, esPasada }) => {
                const estaReservada = reservasEnHora.length > 0;
                const esMia = reservasEnHora.some((r) => r.userId === usuario?.id);
                const bloqueada = estaReservada || esPasada;
                return (
                  <li
                    key={hora}
                    onClick={() => !bloqueada && manejarHora(hora)}
                    className={`text-center py-2 rounded cursor-pointer transition 
                      ${bloqueada ? (esMia ? "bg-green-600" : "bg-red-600") : "bg-cyan-600 text-white"}`}
                  >
                    {hora}
                  </li>
                );

              })}
            </ul>
            {/* Aquí están los textos en rojo y verde explicativos */}
            <div className="mt-4 space-y-1 text-sm">
              <p className="w-30 bg-red-600 rounded text-center">Reservada</p>
              <p className="w-30 bg-green-600 rounded text-center">Mi reserva</p>
              <p className="w-30 bg-cyan-600 text-white rounded text-center">Libre</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default ReservaCalendario;
