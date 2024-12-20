import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Promesa = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const questions = [
    {
      id: "question1",
      question: "¿Cuál es tu profesión o experiencia principal?",
    },
    {
      id: "question2",
      question:
        "¿Qué problema específico resuelves para tus clientes o empleadores?",
    },
    {
      id: "question3",
      question:
        "¿Cuál es tu diferenciador principal frente a otros profesionales de tu área?",
    },
    { id: "question4", question: "¿Quién es tu audiencia objetivo ideal?" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      alert("¡Has completado todos los pasos! Respuestas guardadas:");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const currentQuestion = questions[step - 1];

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/chat");
  };

  return (
    <div>
      <div className="bg-blue-900 text-center py-4">
        <h1 className="text-yellow-400 text-4xl font-bold">
          Generador de Promesa de Valor
        </h1>
        <p className="text-white">
          Responde algunas preguntas y deja que nuestra IA te guíe en cada paso.
          ¡Es rápido, fácil y personalizado!
        </p>
      </div>

      <div className="flex justify-center items-center mt-8"> 
        <div className="bg-white shadow-md rounded-lg mt-10 p-6 mx-6 w-full max-w-5xl">
          <div className="text-center mb-4">
            <h2 className="bg-gray-200 p-4 rounded-lg text-xl font-semibold">
              Paso {step} de {questions.length}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-900 h-2.5 rounded-full"
                style={{ width: `${(step / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg p-3 font-semibold">
              {currentQuestion.question}
            </p>
            <textarea
              type="text"
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
              onClick={step < questions.length ? handleNext : handleNavigation}
              className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              {step < questions.length ? "Siguiente" : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promesa;
