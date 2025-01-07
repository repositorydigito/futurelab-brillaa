import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { sendChatRequest } from "../../../services/apiService";
import { trackEvent  } from "../../../services/bffLeadClient";
import { TEXTS } from "../../../constants/textConstants";
import { setValueProposition } from "../../../redux/slices/threadSlice";

const Chatbot1 = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botMessageCount, setBotMessageCount] = useState(0);
  const [isInteractionComplete, setIsInteractionComplete] = useState(false);

  const threadId = useSelector((state) => state.thread.threadId); // Obtener thread_id de Redux
  const leadId = useSelector((state) => state.thread.leadId); // Obtener lead_id del Redux
  const navigate = useNavigate();
  const location = useLocation(); // Obtener el estado pasado desde navigate
  const dispatch = useDispatch();

  const initialBotResponse = location.state?.initialResponse; // Acceder al response inicial
  const maxInteractions = 3;

  // Mostrar mensaje inicial del chatbot
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: initialBotResponse || "¡Hola! Continuemos construyendo tu promesa de valor. ¿Cómo puedo ayudarte?",
        sender: "bot",
      },
    ]);
    setBotMessageCount(0);
  }, [initialBotResponse]);

  const handleSend = async () => {
    if (inputValue.trim() !== "" && !isInteractionComplete) {
      // Agregar el mensaje del usuario
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);

      const maxInteractions = parseInt(process.env.REACT_APP_MAX_INTERACTIONS_CHATBOT, 10) || 3; 

      const isFinalInteraction = botMessageCount + 1 === maxInteractions;
      const complementaryMessage = isFinalInteraction
        ? `Esta es la última respuesta: "${inputValue}". Por favor, genera exclusivamente la promesa de valor basada en todas las respuestas previas. No incluyas introducciones ni explicaciones adicionales.`
        : `Esta es la respuesta: "${inputValue}". Responde siempre con otra pregunta complementaria para generar la promesa de valor.`

      setInputValue("");

      try {
        // Enviar el mensaje al backend
        const botResponse = await sendChatRequest(complementaryMessage, threadId);

        if (!isFinalInteraction) {
          // Mostrar la respuesta del bot solo si no es la última interacción
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: botResponse.response, sender: "bot" },
          ]);
        }

        // Incrementar el contador de mensajes del bot
        const newBotMessageCount = botMessageCount + 1;
        setBotMessageCount(newBotMessageCount);

        // Si es la última interacción, agregar el mensaje final
        if (isFinalInteraction) {
          // Guardamos la propuesta de valor
          dispatch(setValueProposition(botResponse.response));
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              text: "Haz click en continuar para generar la promesa de valor.",
              sender: "bot",
            },
          ]);
          setIsInteractionComplete(true); // Bloquear nuevas interacciones
        }
      } catch (error) {
        console.error("Error al comunicarse con el bot:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "Hubo un error al obtener la respuesta del bot. Por favor, intenta nuevamente.",
            sender: "bot",
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevenir comportamiento por defecto del Enter
      handleSend();
    }
  };


  const handleContinue = async () => {
    try {
      // Realizar la llamada a trackEvent
      await trackEvent("evt_promesaValor", leadId, {
        page: "PromesaValor",
        action: "Access",
      });

      // Navegar a la siguiente página después de registrar el evento
      navigate("/promesaFinal");
    } catch (error) {
      console.error("Error al registrar el evento:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">{TEXTS.GENERATOR_TITLE}</h1>
        <p className="text-white">{TEXTS.GENERATOR_SUBTITLE}</p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
          <h1 className="text-center text-2xl m-2 font-bold">{TEXTS.PERFORMANCE_TITLE}</h1>
          <h3 className="mb-3">{TEXTS.PERFORMANCE_SUBTITLE}</h3>
        </div>

        <div className="p-4 overflow-auto h-80 flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`p-3 max-w-md rounded-lg shadow-md text-gray-800 text-sm ${
                  message.sender === "bot" ? "bg-gray-200" : "bg-blue-200"
                } break-words whitespace-normal`}
              >
                {message.text}
              </div>
              {message.sender === "bot" && (
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/007/225/199/small_2x/robot-chat-bot-concept-illustration-vector.jpg"
                  alt="Asistente"
                  className="ml-2 w-10 h-10 rounded-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center p-2 bg-white border-t border-gray-300 rounded-b-lg">
          <input
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Escribe tu mensaje..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress} // Manejar tecla Enter
            disabled={isInteractionComplete} // Deshabilitar input si terminó la interacción
          />
          <button
            className="ml-3 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            onClick={handleSend}
            disabled={isInteractionComplete} // Deshabilitar botón si terminó la interacción
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div className="py-4 text-center">
        {!isInteractionComplete ? (
          <p className="text-gray-600">
            Te quedan {maxInteractions - botMessageCount} interacciones para construir tu promesa de valor.
          </p>
        ) : (
          <p className="text-gray-600">
            Has llegado al límite de interacciones. Haz clic en "Continuar" para generar tu promesa de valor.
          </p>
        )}
      </div>

      {isInteractionComplete && (
        <div className="flex justify-center py-4">
          <button
            className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={handleContinue} 
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot1;
