import React from "react";
import { useNavigate } from "react-router-dom";

const Publicaciones = () => {
  const navigate = useNavigate();
  const handleDownloadPDF = async () => {
    try {
      // Simulación de solicitud al backend para obtener el PDF
      const response = await fetch("/api/generate-pdf", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al generar el PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "estrategia.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          Ejecución de Estrategia
        </h1>
        <p className="text-white">
          Revisa tus publicaciones según tu estrategia
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
              onClick={handleDownloadPDF}
            >
              <i className="fas fa-download mr-2"></i> Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publicaciones;
