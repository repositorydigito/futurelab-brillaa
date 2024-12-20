import React from "react";
import { useNavigate } from "react-router-dom";

const Publicaciones = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-blue-900 w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          Ejecuta tu Estrategia
        </h1>
        <p className="text-white">
          Crea tu propuesta de valor única en una experiencia interactiva
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-6">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border border-gray-300">
            <h2 className="text-center text-lg font-bold">
              ¡Tu contenido personalizado está listo!
            </h2>
          </div>
          <div className="bg-gray-100 text-center py-2 border border-gray-300">
            <h3 className="text-lg font-medium">Publicaciones</h3>
          </div>
          <div className="divide-y divide-gray-300 rounded-b-lg border border-gray-300">
            <div className="py-4 px-6 flex text-left">
              <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
              <p>
                Tip del día: 3 técnicas simples para mejorar el rendimiento de
                tu aplicación web que puedes implementar hoy mismo.
              </p>
            </div>
            <div className="py-4 px-6 flex text-left">
              <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
              <p>
                Tip del día: 3 técnicas simples para mejorar el rendimiento de
                tu aplicación web que puedes implementar hoy mismo.
              </p>
            </div>
            <div className="py-4 px-6 flex text-left">
              <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
              <p>
                Tip del día: 3 técnicas simples para mejorar el rendimiento de
                tu aplicación web que puedes implementar hoy mismo.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-8 space-x-4">
            <button 
            className="bg-white text-blue-900 border border-blue-900 rounded-lg px-4 py-2 hover:bg-blue-900 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => navigate("/chat3")}
            > 
              Desarrollar otras publicaciones
            </button>
            <button className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out">
              <i className="fas fa-download mr-2"></i> Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publicaciones;
