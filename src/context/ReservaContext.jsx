import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx"; // <-- importante

const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState(() => {
    const reservasGuardadas = localStorage.getItem("reservas");
    return reservasGuardadas
      ? JSON.parse(reservasGuardadas)
      : { fronton: [], padel: [] };
  });

  const [ultimaReserva, setUltimaReserva] = useState(null);
  const { usuario } = useAuth(); // usuario activo

  useEffect(() => {
    localStorage.setItem("reservas", JSON.stringify(reservas));
  }, [reservas]);

  const agregarReserva = (deporte, fecha, hora) => {
    if (!usuario) return;

    setReservas((prev) => {
      const nuevasReservas = { ...prev };
      if (!nuevasReservas[deporte]) nuevasReservas[deporte] = [];

      const existe = nuevasReservas[deporte].some(
        (r) => r.fecha === fecha && r.hora === hora
      );
      if (!existe) {
        nuevasReservas[deporte].push({
          fecha,
          hora,
          userId: usuario.id, // <-- clave del usuario
        });
      }
      return nuevasReservas;
    });
    setUltimaReserva({ deporte, fecha, hora });
  };

  const eliminarReserva = (deporte, fecha, hora) => {
    if (!usuario) return;

    setReservas((prev) => {
      const nuevasReservas = { ...prev };
      if (nuevasReservas[deporte]) {
        nuevasReservas[deporte] = nuevasReservas[deporte].filter(
          (r) =>
            !(r.fecha === fecha && r.hora === hora && r.userId === usuario.id)
        );
      }
      return nuevasReservas;
    });
  };

  const eliminarReservasDeUsuario = (userId) => {
    setReservas((prev) => {
      const nuevasReservas = {};
      for (const deporte in prev) {
        nuevasReservas[deporte] = prev[deporte].filter(
          (reserva) => reserva.userId !== userId
        );
      }
      return nuevasReservas;
    });
  };


  return (
    <ReservaContext.Provider
      value={{
         reservas,
          agregarReserva,
           eliminarReserva,
            ultimaReserva,
             setUltimaReserva,
              eliminarReservasDeUsuario }}
    >
      {children}
    </ReservaContext.Provider>
  );
}

export function useReservas() {
  return useContext(ReservaContext);
}
