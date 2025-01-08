import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trackEvent, registerUser } from "../../../services/bffLeadClient";
import { setUser } from "../../../redux/slices/userSlice";
import { TEXTS } from "../../../constants/textConstants";

const PromesaFinal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el modal
  const [otp, setOtp] = useState(""); // Estado para el OTP
  const [error, setError] = useState(""); // Estado para mensajes de error

  // Obtener la propuesta de valor desde Redux
  const valueProposition = useSelector((state) => state.thread.valueProposition);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);

  const handleStrategyClick = () => {
    setShowPopup(true); // Activar el modal
  };

  const handleModalClose = async () => {
    if (otp.length !== 6) {
      setError("El passcode debe tener 6 dígitos.");
      return;
    }

    try {
      // Validar el OTP con registerUser
      const { token, lead_id } = await registerUser(name, email, otp);

      // Actualizar el token y leadId en Redux y localStorage
      dispatch(setUser({ name, email, token, leadId: lead_id }));
      localStorage.setItem("authToken", token);
      localStorage.setItem("leadId", lead_id);

      // Realizar la llamada a trackEvent
      await trackEvent("evt_BuildStrategy", lead_id, {
        page: "Generemos estrategia",
        action: "click",
        passcode: otp,
      });

      setShowPopup(false); // Cerrar el modal
      navigate("/cuestionario"); // Navegar al cuestionario después de cerrar el modal
    } catch (error) {
      if (error.response && error.response.data.detail === "Invalid passcode") {
        setError("El passcode es inválido. Por favor, intenta nuevamente.");
      } else {
        console.error("Error al registrar el evento:", error);
        setError("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
      }
    }
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
            <h2 className="text-center text-lg font-bold">Tu Promesa de Valor</h2>
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
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(""); // Limpiar el error al escribir
                  }}
                  maxLength={6}
                  placeholder="Ingresa el passcode que enviamos a tu correo."
                  className="text-center w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <button
                className="bg-yellow-500 text-white text-lg font-semibold py-3 px-6 rounded-full"
                onClick={handleModalClose} // Validar y navegar
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
