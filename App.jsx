// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from './src/pages/LoginPage'
import AppEsports from './src/pages/AppEsports'
import Register from './src/pages/RegisterPage'
import MenuPage from './src/pages/MenuPage'
import Reservas from './src/pages/ReservasPage'
import UsersList from './src/components/UsersList'
import UsersApp from './src/UsersApp'
import PerfilPage from './src/pages/PerfilPage'
import { useAuth } from './src/context/AuthContext'
import { Navigate } from 'react-router-dom'

function App() {

    const { usuario } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<AppEsports />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/misreservas" element={<MenuPage />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route
                path="/usersList"
                element={
                    usuario && usuario.rol === "admin" ? <UsersList /> : <Navigate to="/login" replace />
                }
            />
            <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
    )
}

export default App
