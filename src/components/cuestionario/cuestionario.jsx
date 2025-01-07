import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STRATEGY_QUESTIONS } from "../../constants/strategyQuestions";
import { INITIALQUESTIONS } from "../../constants/initialQuestions";
import { TEXTS } from "../../constants/textConstants";
import { setThreadId } from "../../redux/slices/threadSlice";
import { sendChatAgent2Request } from "../../services/apiService";

const Cuestionario = () => {
  const [formData, setFormData] = useState(
    STRATEGY_QUESTIONS.reduce((acc, question) => {
      acc[question.id] = "";
      return acc;
    }, {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // Obtener las respuestas iniciales desde Redux
  const initialAnswers = useSelector((state) => state.questions.answers);
  // Obtener la propuesta de valor desde Redux
  const valueProposition = useSelector((state) => state.thread.valueProposition);
  const dispatch = useDispatch();

  const handleNavigation = async () => {
    try {
      setIsSubmitting(true);

      // Construir contenido dinámico del cuestionario inicial (preguntas 1, 2, y 4)
      const initialContent = [1, 2, 4].map((index) => {
        const question = INITIALQUESTIONS[index - 1];
        const answer = initialAnswers[question.id] || "Sin respuesta";
        return `${question.question}: ${answer}`;
      }).join("\n");

      // Construir contenido dinámico del cuestionario de estrategia
      const strategyContent = STRATEGY_QUESTIONS.map((question) => {
        const answer = formData[question.id] || "Sin respuesta";
        return `${question.label}: ${answer}`;
      }).join("\n");

      // Agregar la propuesta de valor
      const valuePropositionContent = valueProposition
        ? `Propuesta de Valor: ${valueProposition}`
        : "Propuesta de Valor: No disponible";

      // Complementary message
      const complementaryMessage =
        "Aquí tienes las respuestas combinadas del cuestionario inicial, la propuesta de valor y el cuestionario de estrategia. Analiza y proporciona una pregunta complementaria que ayude a completar la estrategia de marca.";


      // Construir el input final
      const input = `${initialContent}\n\n${valuePropositionContent}\n\n${strategyContent}\n\n${complementaryMessage}`;

      // Enviar datos a la API
      const response = await sendChatAgent2Request(input);
      console.log("API Response:", response);
      // Guardar el thread_id en Redux
      dispatch(setThreadId(response.thread_id));
      // Navegar a chat2 con la respuesta inicial del bot
      navigate("/chat2", { state: { cuestionarioResponse: response.response } });
    } catch (error) {
      console.error("Error al enviar datos a la API:", error);
      alert("Hubo un error al enviar los datos. Por favor, inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
          {TEXTS.QUESTIONNAIRE_TITLE}
        </h1>
        <p className="text-white">
          {TEXTS.QUESTIONNAIRE_SUBTITLE}
        </p>
      </div>

      <div className="mt-10 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-6">
          <div className="bg-gray-200 px-4 py-2 rounded-lg border-b border-gray-300">
            <h2 className="text-center text-lg font-bold">Cuestionario</h2>
          </div>
          <form>
            {STRATEGY_QUESTIONS.map((question) => (
              <div className="mb-6 text-left" key={question.id}>
                <label className="block text-gray-700 font-semibold mb-2">
                  {question.label}
                </label>
                <textarea
                  name={question.id}
                  value={formData[question.id]}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  placeholder={question.placeholder}
                ></textarea>
              </div>
            ))}
          </form>
        </div>
      </div>
      <div className="text-center m-8">
        <button
          type="button"
          className={`bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
          }`}
          onClick={handleNavigation}
          disabled={isSubmitting} // Deshabilitar mientras se envía
        >
          {isSubmitting ? "Enviando..." : "Enviar Respuestas"}
        </button>
      </div>
    </div>
  );
};

export default Cuestionario;
