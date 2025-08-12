import { createContext, useContext } from "react";
import { useUsers } from "../hooks/useUsers";

// Creamos el contexto
const UsersContext = createContext();

// Provider que envuelve la app
export const UsersProvider = ({ children }) => {
  const usersData = useUsers();

  return (
    <UsersContext.Provider value={usersData}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook para usar el contexto
export const useUsersContext = () => useContext(UsersContext);
