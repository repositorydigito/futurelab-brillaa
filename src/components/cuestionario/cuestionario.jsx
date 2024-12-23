import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cuestionario = () => {
  const [formData, setFormData] = useState({
    achievements: "",
    certifications: "",
    technologies: "",
  });

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/chat2");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // You can send the formData to your bot backend here
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          Generador de Estrategia
        </h1>
        <p className="text-white">
          Responde las siguientes preguntas para ayudarnos a crear tu estrategia
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-6">
          <div className="bg-gray-200 px-4 py-2 rounded-lg border-b border-gray-300">
            <h2 className="text-center text-lg font-bold">Cuestionario</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Cuáles son los 3 principales logros en tu carrera profesional?
              </label>
              <textarea
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus logros aquí..."
              ></textarea>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Qué certificaciones o educación formal respaldan tu
                experiencia?
              </label>
              <textarea
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus certificaciones aquí..."
              ></textarea>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Cuáles son las tecnologías o metodologías en las que te
                especializas?
              </label>
              <textarea
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus tecnologías aquí..."
              ></textarea>
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Cuáles son los 3 principales logros en tu carrera profesional?
              </label>
              <textarea
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus logros aquí..."
              ></textarea>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Qué certificaciones o educación formal respaldan tu
                experiencia?
              </label>
              <textarea
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus certificaciones aquí..."
              ></textarea>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-semibold mb-2">
                ¿Cuáles son las tecnologías o metodologías en las que te
                especializas?
              </label>
              <textarea
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg"
                placeholder="Escribe tus tecnologías aquí..."
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center m-8">
        <button
          type="submit"
          className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={handleNavigation}
        >
          Enviar Respuestas
        </button>
      </div>
    </div>
  );
};

export default Cuestionario;
