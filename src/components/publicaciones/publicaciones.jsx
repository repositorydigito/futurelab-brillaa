import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";

const Publicaciones = () => {
  const navigate = useNavigate();
  const valuePublications = useSelector((state) => state.thread.valuePublications || []); // Asegúrate de que sea un array

  const handleDownloadPDF = () => {
    if (!Array.isArray(valuePublications) || valuePublications.length === 0) {
      console.error("No hay publicaciones disponibles para generar el PDF.");
      return;
    }

    const doc = new jsPDF();

    // Configurar el título del documento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Publicaciones Personalizadas", 105, 20, { align: "center" });

    // Configurar las publicaciones
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 40; // Posición inicial para el contenido

    valuePublications.forEach((publicacion, index) => {
      if (y > 270) { // Crear una nueva página si el contenido excede
        doc.addPage();
        y = 20;
      }
      doc.text(`Publicación ${index + 1}:`, 10, y);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text(publicacion.titulo, 10, y);
      y += 10;
      doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(publicacion.contenido, 190), 10, y);
      y += 20;
      doc.setFont("helvetica", "italic");
      doc.text(`Fecha: ${publicacion.fecha}`, 10, y);
      y += 10;
    });

    // Descargar el archivo PDF
    doc.save("publicaciones.pdf");
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

          {/* Renderizar publicaciones dinámicamente */}
          <div className="divide-y divide-gray-300 rounded-b-lg border border-gray-300">
            {Array.isArray(valuePublications) && valuePublications.length > 0 ? (
              valuePublications.map((publicacion, index) => (
                <div key={index} className="py-4 px-6 flex flex-col text-left">
                  <h3 className="text-blue-900 font-bold mb-2">
                    {publicacion.titulo}
                  </h3>
                  <p className="text-gray-800">{publicacion.contenido}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Fecha de publicación: {publicacion.fecha}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-4 px-6 text-gray-500">
                No hay publicaciones disponibles.
              </p>
            )}
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
