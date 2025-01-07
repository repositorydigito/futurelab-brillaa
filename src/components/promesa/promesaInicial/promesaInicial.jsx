import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setThreadId } from "../../../redux/slices/threadSlice";
import { sendChatRequest } from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { TEXTS } from "../../../constants/textConstants";
import { setQuestions, setAnswer } from "../../../redux/slices/questionsSlice";
import { INITIALQUESTIONS } from "../../../constants/initialQuestions";

const PromesaInicial = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(
    INITIALQUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {})
  );

  const currentQuestion = INITIALQUESTIONS[step - 1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
    dispatch(setAnswer({ questionId: name, answer: value })); // Guardar en Redux
  };

  const handleNext = () => {
    if (step < INITIALQUESTIONS.length) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Usuario en Redux:", user);
  
      // Texto estático inicial y final
      const staticStart = "Te estoy enviando una serie de preguntas con sus repuestas";
      const staticEnd = "Analiza las respuestas y tómalo en cuenta. Tu respuesta a este chat debe ser una pregunta complementaria a las anteriores.";
  
      // Concatenar preguntas con respuestas
      const dynamicContent = INITIALQUESTIONS.map((q) => {
        const answer = answers[q.id] || "Sin respuesta";
        return `${q.question}: ${answer}`;
      }).join("\n");
  
      // Crear el input final
      const input = `${staticStart}\n${dynamicContent}\n${staticEnd}`;
  
      // Enviar datos a la API
      const response = await sendChatRequest(input);
      console.log("Datos enviados correctamente:", response);
  
      // Guardar el thread_id en Redux
      dispatch(setThreadId(response.thread_id));
      navigate("/chat", { state: { initialResponse: response.response } });
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">
        {TEXTS.GENERATOR_TITLE}
        </h1>
        <p className="text-white">
          {TEXTS.GENERATOR_SUBTITLE}
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="bg-gray-200 p-4 rounded-lg text-xl font-semibold">
            Paso {step} de {INITIALQUESTIONS.length}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-custom-blue-gradient h-2.5 rounded-full"
                style={{ width: `${(step / INITIALQUESTIONS.length) * 100}%` }}
                ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg p-3 font-semibold">
              {currentQuestion.question}
            </p>
            <textarea
              name={currentQuestion.id}
              value={answers[currentQuestion.id]}
              onChange={handleChange}
              className="border rounded-lg p-4 mt-2 w-full h-32"
              placeholder="Escribe tu respuesta aquí..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Anterior
              </button>
            )}
            <button
              onClick={step < INITIALQUESTIONS.length ? handleNext : handleSubmit}
              className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              {step < INITIALQUESTIONS.length ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromesaInicial;