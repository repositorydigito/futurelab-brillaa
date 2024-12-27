import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendUserData } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Usar la función del archivo api.js
      const response = await sendUserData(formData);
      setShowModal(false);
      navigate("/promise");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setShowModal(false);
      navigate("/promise");
    }
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
              onClick={() => setShowModal(true)}
            >
              COMIENZA AHORA
            </button>
          </div>
        </div>
      </div>

      {/* Modal para Nombre y Correo Electrónico */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-blue-900 text-xl font-bold mb-4">Proporcione sus datos</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2 text-left">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Escribe tu nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2 text-left">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Escribe tu correo"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-900 text-white rounded-lg px-4 py-2 hover:bg-blue-800"
                onClick={handleSubmit}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
