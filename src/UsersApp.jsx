import React from "react";
import { UsersForm } from "./components/UsersForm";
import UsersList from "./components/UsersList"; // default import sin llaves
import { useUsers } from "./hooks/useUsers";

export const UsersApp = () => {
  const {
    users,
    userSelected,
    setUserSelected,
    initialUserForm,
    handlerAddUser,
    handlerUserSelectedForm,
    handlerRemoveUser,
    
  } = useUsers();

  return (
    <div className="p-12">
      <UsersForm
        handlerAddUser={handlerAddUser}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
        initialUserForm={initialUserForm}
      />

      <UsersList
        handlerUserSelectedForm={handlerUserSelectedForm}
        handlerRemoveUser={handlerRemoveUser}
        users={users}
      />
    </div>
  );
};

export default UsersApp;
