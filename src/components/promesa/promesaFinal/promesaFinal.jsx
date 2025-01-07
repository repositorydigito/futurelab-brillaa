import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TEXTS } from "../../../constants/textConstants";

const PromesaFinal = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el modal

  // Obtener la propuesta de valor desde Redux
  const valueProposition = useSelector((state) => state.thread.valueProposition);

  const handleStrategyClick = () => {
    setShowPopup(true); // Activar el modal
  };

  const handleModalClose = () => {
    setShowPopup(false); // Cerrar el modal
    navigate("/cuestionario"); // Navegar al cuestionario después de cerrar el modal
  };

  return (
    <div>
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          {TEXTS.GENERATOR_TITLE}
        </h1>
        <p className="text-white">
          Crea tu propuesta de valor única en una experiencia interactiva
        </p>
      </div>

      <div className="flex justify-center mt-24">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
            <h2 className="text-center text-lg font-bold">
              Tu Promesa de Valor
            </h2>
          </div>
          <div className="bg-white-100 p-4 rounded-b-lg border border-gray-300 mb-6">
            {/* Mostrar la propuesta de valor almacenada en Redux */}
            <p className="text-gray-700 text-justify">
              {valueProposition || "Cargando tu Promesa de Valor..."}
            </p>
          </div>
          <div className="flex justify-between space-x-4">
            <button
              className="bg-white text-blue-900 border border-blue-900 rounded-lg px-4 py-2 hover:bg-blue-900 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => navigate("/promise")}
            >
              Crear nueva Promesa de Valor
            </button>
            <button
              className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={handleStrategyClick}
            >
              Construir Estrategia
            </button>
          </div>
        </div>
      </div>

      {/* Modal para "Construye tu estrategia" */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-custom-blue-gradient rounded-lg shadow-lg p-16 w-100">
            <div className="text-center">
              <h1 className="text-yellow-500 text-3xl font-bold mb-8">
                {TEXTS.BUILD}
              </h1>
              <button
                className="bg-yellow-500 text-white text-lg font-semibold py-3 px-6 rounded-full"
                onClick={handleModalClose} // Cerrar el modal y navegar
              >
                {TEXTS.BUTTON_BUILD}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromesaFinal;
