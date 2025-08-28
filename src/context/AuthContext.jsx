import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Al montar el provider, intento cargar el usuario desde localStorage
  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) {
      setUsuario(activeUser);
    }
  }, []);

  const login = (user) => {
    const { password, ...userWithoutPassword } = user;
    setUsuario(userWithoutPassword);
    // Guardamos en localStorage solo los datos sin la contraseña
    localStorage.setItem("activeUser", JSON.stringify(userWithoutPassword));
  };


  // Función para cerrar sesión y eliminar usuario
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("activeUser");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir el contexto
export function useAuth() {
  return useContext(AuthContext);
}
