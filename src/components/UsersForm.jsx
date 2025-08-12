import { useEffect, useState } from "react";

export const UsersForm = ({ handlerAddUser, userSelected, setUserSelected, initialUserForm }) => {
    const [formState, setFormState] = useState(initialUserForm);

    useEffect(() => {
        setFormState(userSelected);
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handlerAddUser(formState);
    };

    const onReset = () => {
        setUserSelected(initialUserForm);
    };

    return (
        <form onSubmit={onSubmit} className="mb-6 flex gap-4 flex-wrap">
            <input
                type="text"
                name="nombre"
                value={formState.nombre}
                onChange={onInputChange}
                placeholder="Nombre"
                className="border px-3 py-2"
                required
            />
            <input
                type="text"
                name="apellido"
                value={formState.apellido}
                onChange={onInputChange}
                placeholder="Apellido"
                className="border px-3 py-2"
                required
            />
            <input
                type="email"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                placeholder="Email"
                className="border px-3 py-2"
                required
            />
            <input
                type="password"
                name="password"
                value={formState.password}
                onChange={onInputChange}
                placeholder="Contraseña"
                className="border px-3 py-2"
                required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                {formState.id ? "Actualizar" : "Crear"}
            </button>
            <button type="button" onClick={onReset} className="bg-gray-500 text-white px-4 py-2 rounded">
                Limpiar
            </button>
        </form>
    );
};
