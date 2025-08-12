import React, { useEffect } from "react"
import personasDeportes from '../assets/images/personasDeportes.webp'
import { useNavigate } from "react-router-dom"

function AppEsports() {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000);

    return () => clearTimeout(timer)


  }, [navigate])


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-cyan-800">

      <h1 className="text-4xl text-blue-50 text-center font-serif my-20">Esports Favara</h1>
      {/* Imagen centrada sin ampliarla en exceso */}
      <img
        src={personasDeportes}
        alt="personasDeportes"
        className="max-w-full max-h-[80vh] object-contain"
      />
  
      {/* Spinner y texto debajo */}
      <div className="mt-40 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-amber-50">Cargando...</p>
      </div>
    </div>
  )
  
}

export default AppEsports
