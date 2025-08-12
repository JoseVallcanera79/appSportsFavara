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

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppEsports />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/misreservas" element={<MenuPage />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/usersList" element={<UsersList />}/>
            <Route path="/usersApp" element={<UsersApp />}/>
            <Route path="/perfil" element={<PerfilPage />}/>
        </Routes>
    )
}

export default App
