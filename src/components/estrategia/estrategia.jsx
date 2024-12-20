import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Estrategia = () => {

    const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">

      <div className="bg-blue-900 w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          Generador de Estrategia
        </h1>
        <p className="text-white">
          Crea tu propuesta de valor única en una experiencia interactiva
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-6">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
            <h2 className="text-center text-lg font-bold">¡Tu Estrategia está lista!</h2>
          </div>
          <div className="p-3 rounded-b-lg border border-gray-300">
            <p className="text-center text-gray-600 mb-6">
              Has completado con éxito la generación de tu Estrategia
              personalizada. Ahora puedes descargarla en formato PDF para usarla
              en tu perfil profesional, CV, o presentaciones.
            </p>
            <div className="flex m-8 justify-center mb-6">
              <button className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out">
                <i className="fas fa-download mr-2"></i> Descargar PDF
              </button>
            </div>
          </div>
          
          
          <div className="flex justify-between mt-8 space-x-4">
            <button 
            className="bg-white text-blue-900 border border-blue-900 rounded-lg px-4 py-2 hover:bg-blue-900 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out" 
            onClick={() => navigate("/promise")} 
            >
              Crear nueva Promesa de Valor
            </button>
            <button 
            className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => navigate("/chat3")}
            >
              Ejecutar Estrategia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estrategia;