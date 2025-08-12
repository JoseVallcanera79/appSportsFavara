import React, { useState } from "react";
import ReservaCalendario from "../components/Calendar.jsx";
import Navbar from "../components/Navbar.jsx";
// ajustá la ruta si lo guardaste en otra carpeta



function Reservas() {


    return (

        <div className="min-h-screen bg-cyan-800 text-white">
            <Navbar />


            <div className="w-full min-h-screen bg-cyan-900 text-amber-50 p-4">
                <div className="text-[25px] font-bold text-center mt-3 ">Reservas</div>

                <div className="bg-blue-50 w-80 h-220 mt-10 pt-7 text-center mx-auto  rounded-2xl text-gray-800">
                    <div className="fronton mb-4">
                        <div className="p-2 text-2xl font-bold">Fronton</div>
                        <div className=" w-60 items-center rounded-2xl h-80 mx-auto mt-3 pt-4 shadow-2xl">
                            <ReservaCalendario deporte="fronton" />
                        </div>
                    </div>

                    <div className="padel">
                        <div className="p-2 text-2xl font-bold">Padel</div>
                        <div className="bg-blue-50 w-60 items-center rounded-2xl h-80 mx-auto mt-3 pt-4 shadow-2xl">
                            <ReservaCalendario deporte="padel" />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reservas