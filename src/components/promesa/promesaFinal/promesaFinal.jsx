import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PromesaFinal = () => {
    const navigate = useNavigate();

  return (
    <div>
      <div className="bg-blue-900 w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">Generador de Promesa de Valor</h1>
        <p className="text-white">
          Crea tu propuesta de valor única en una experiencia interactiva
        </p>
      </div>

      <div className="flex justify-center mt-24">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
            <h2 className="text-center text-lg font-bold">Tu Promesa de Valor</h2>
          </div>
          <div className="bg-white-100 p-4 rounded-b-lg border border-gray-300 mb-6">
            <p className="text-gray-700 text-justify">
              Soy un ingeniero de software especializado en transformar ideas
              innovadoras en aplicaciones web de alto rendimiento. Con 8 años de
              experiencia trabajando con startups exitosas, me destaco por
              combinar excelencia técnica con una profunda comprensión de las
              necesidades empresariales. Mi enfoque en la optimización del
              rendimiento y la escalabilidad ha permitido a múltiples empresas
              reducir sus costos operativos en un 40% mientras mejoran la
              experiencia del usuario. Ayudo a startups y empresas medianas a
              construir productos digitales que no solo funcionan
              eficientemente, sino que también impulsan el crecimiento del
              negocio.
            </p>
          </div>
          <div className="flex justify-between space-x-4">
            <button className="bg-white text-blue-900 border border-blue-900 rounded-lg px-4 py-2 hover:bg-blue-900 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out" 
              onClick={() => navigate("/promise")}>
              Crear nueva Promesa de Valor
            </button>
            <button className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out" 
              onClick={() => navigate("/cuestionario")}>
              Construir Estrategia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromesaFinal;
