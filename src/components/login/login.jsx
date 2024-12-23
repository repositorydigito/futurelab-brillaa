import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/promise"); 
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-1/2 flex items-center justify-center bg-black">
          <div className="w-full h-full">
            <img
              alt="Brillaa logo"
              className="w-full h-full object-cover"
              src="imageLogin.png"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center bg-custom-blue-gradient text-white p-8">
          <div className="text-center">
            <h1 className="text-yellow-400 text-6xl font-bold mb-10">¡BIENVENID@!</h1>
            <h2 className="text-3xl mb-3 font-bold p-8">
              Construye Tu Marca Personal con Inteligencia Artificial
            </h2>
            <p className="text-2xl mb-8 italic p-5">
              Te ayudamos a crear una propuesta de valor única, desarrollar una
              estrategia de contenidos efectiva y ejecutar tus planes con
              contenido personalizado.
            </p>
            <button 
            className="border rounded-lg bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
            onClick={handleNavigation}
            >
              COMIENZA AHORA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
