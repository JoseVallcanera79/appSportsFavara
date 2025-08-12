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

  // Función para iniciar sesión y guardar usuario
  const login = (user) => {
    setUsuario(user);
    localStorage.setItem("activeUser", JSON.stringify(user));
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
