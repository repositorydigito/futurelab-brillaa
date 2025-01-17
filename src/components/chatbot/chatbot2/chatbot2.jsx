import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendChatAgent2Request } from "../../../services/apiService";
import { TEXTS } from "../../../constants/textConstants";
import { setValueBrandStrategy } from "../../../redux/slices/threadSlice";
import { trackEvent  } from "../../../services/bffLeadClient";

const Chatbot2 = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botMessageCount, setBotMessageCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isInteractionComplete, setIsInteractionComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cuestionarioBotResponse = location.state?.cuestionarioResponse; // Respuesta del Cuestionario
  const threadId = useSelector((state) => state.thread.threadId); // Obtener el thread_id desde Redux
  const leadId = localStorage.getItem('leadId'); 

  const maxInteractions = parseInt(process.env.REACT_APP_MAX_INTERACTIONS_CHATBOT, 10) || 3; 
  // Mostrar el mensaje del bot al cargar el componente
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: cuestionarioBotResponse || "¡Hola! Continuemos construyendo tu estrategia. ¿Cómo puedo ayudarte?",
        sender: "bot",
      },
    ]);
  }, [cuestionarioBotResponse]);

  const handleSend = async () => {
    if (inputValue.trim() !== "" && !isInteractionComplete) {
      // Agregar el mensaje del usuario
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
     
      // Preparar mensaje a enviar al backend
      const isFinalInteraction = botMessageCount + 1 === 3;
      const complementaryMessage = isFinalInteraction
        ? `Esta es la última interacción: "${inputValue}". Ten en cuenta todas las preguntas y respuestas de INSUMO y CONTEXTO proporcionadas anteriormente y genera un cierre para esta estrategia. `
        : `Esta es la respuesta: "${inputValue}". Responde siempre con otra versión del entregable de estrategia de marca, que incluya lo que el usuario dice en la respuesta.`
      setInputValue("");

      try {
         // Enviar el mensaje al backend
        const botResponse = await sendChatAgent2Request(complementaryMessage, threadId);

        if (!isFinalInteraction) {
          // Mostrar la respuesta del bot solo si no es la última interacción
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: botResponse.response, sender: "bot" },
          ]);
        }

        const newBotMessageCount = botMessageCount + 1;
        setBotMessageCount(newBotMessageCount);

       // Si es la última interacción, agregar el mensaje final
        if (isFinalInteraction) {
          // Guardamos la estrategia generada
          dispatch(setValueBrandStrategy(botResponse.response));
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              text: "Haz click en continuar para generar tu estrategia de marca.",
              sender: "bot",
            },
          ]);
          setIsInteractionComplete(true); // Bloquear nuevas interacciones
        }

        // Reiniciar contador de errores en caso de éxito
        setErrorCount(0);
      } catch (error) {
        console.error("Error al comunicarse con el bot:", error);
        setErrorCount((prevErrorCount) => prevErrorCount + 1);

        // Mostrar mensaje de error
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: errorCount < 2
              ? "Hubo un error al obtener la respuesta del bot. Por favor, intenta nuevamente."
              : "Ha ocurrido un error varias veces. Por favor, continúa al siguiente paso.",
            sender: "bot",
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContinue = async () => {
    try {
      // Realizar la llamada a trackEvent
      await trackEvent("evt_estrategiaMarca", leadId, {
        page: "EstrategiaMarca",
        action: "Access",
      });

      navigate("/estrategia");
    } catch (error) {
      console.error("Error al registrar el evento:", error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">Generador de Estrategia</h1>
        <p className="text-white">
          Conversa con el asistente para mejorar tu Estrategia
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
          <h1 className="text-center text-2xl m-2 font-bold">{TEXTS.QUESTIONNAIRE_BOT_TITLE}</h1>
          <h3 className="mb-3">{TEXTS.QUESTIONNAIRE_BOT_SUBTITLE}</h3>
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
            onKeyDown={handleKeyPress}
            disabled={isInteractionComplete}
          />
          <button
            className="ml-3 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            onClick={handleSend}
            disabled={isInteractionComplete}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div className="py-4 text-center">
        {!isInteractionComplete ? (
          <p className="text-gray-600">
            Te quedan {maxInteractions - botMessageCount} interacciones para construir tu estrategia de marca.
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

export default Chatbot2;
