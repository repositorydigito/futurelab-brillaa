import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publicaciones = () => {
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
      // Aquí se enviará la información al backend
      setShowModal(false);
      // Simulación de descarga de PDF después del envío
      const link = document.createElement("a");
      link.href = "/path/to/generated/pdf"; // Sustituir con el enlace correcto al PDF generado
      link.download = "estrategia.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
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
            <button
              className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-download mr-2"></i> Descargar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Modal para Nombres y Correo Electrónico */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-blue-900 text-xl font-bold mb-4">Proporcione sus datos</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nombre Completo</label>
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
              <label className="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
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

export default Publicaciones;
