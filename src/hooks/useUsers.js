import { useEffect, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useReservas } from "../context/ReservaContext"; // <-- importación

const getInitialUsers = (initialState) => {
    const usersFromStorage = localStorage.getItem("users");
    return usersFromStorage ? JSON.parse(usersFromStorage) : initialState;
};

export const initialUserForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
};

export const useUsers = () => {
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [users, dispatch] = useReducer(usersReducer, [], getInitialUsers);

    const { eliminarReservasDeUsuario } = useReservas(); // <-- hook

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const handlerAddUser = (user) => {
        const userExists = users.some((u) => u.id === user.id);

        if (!userExists) {
            // Si la lista está vacía, el próximo ID será 1
            if (users.length === 0) {
                user.id = 1;
            } else {
                // Si no está vacía, asignar el máximo ID + 1
                const maxId = Math.max(...users.map((u) => u.id));
                user.id = maxId + 1;
            }
        }

        const type = userExists ? "updateUser" : "addUser";

        dispatch({ type, payload: user });

        Swal.fire({
            title: userExists ? "Usuario Actualizado" : "Nuevo Usuario!",
            text: userExists
                ? "El usuario ha sido actualizado con éxito!"
                : "El usuario ha sido creado con éxito!",
            icon: "success",
        });

        setUserSelected(initialUserForm);
    };

    const handlerUserSelectedForm = (user) => {
        setUserSelected({ ...user });
    };

    const handlerRemoveUser = (id, nombre) => {
        Swal.fire({
            title: "¿Desea eliminar?",
            text: `Está seguro de eliminar a "${nombre}"!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarReservasDeUsuario(id); // <-- elimina reservas antes
                dispatch({ type: "removeUser", payload: id });
                Swal.fire({
                    title: `Usuario "${nombre}" Eliminado!`,
                    text: `El Usuario "${nombre}" y sus reservas fueron eliminados con éxito.`,
                    icon: "success",
                });
            }
        });
    };

    return {
        users,
        userSelected,
        initialUserForm,
        handlerAddUser,
        handlerUserSelectedForm,
        handlerRemoveUser,
        setUserSelected,
    };
};
