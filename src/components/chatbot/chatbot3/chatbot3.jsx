import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendChatAgent3Request } from "../../../services/apiService";
import { TEXTS } from "../../../constants/textConstants";
import { setValuePublications } from "../../../redux/slices/threadSlice";
import { trackEvent  } from "../../../services/bffLeadClient";

const Chatbot3 = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [botMessageCount, setBotMessageCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isInteractionComplete, setIsInteractionComplete] = useState(false);

  const valueBrandStrategy = useSelector((state) => state.thread.valueBrandStrategy);
  const leadId = localStorage.getItem('leadId');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mostrar el mensaje inicial del bot al cargar el componente
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hola, puedo ayudarte si me compartes un link o tópico sobre el cual quieras hacer una publicación en Linkedin.",
        sender: "bot",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() !== "" && !isInteractionComplete) {
      // Agregar el mensaje del usuario
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);

      // Preparar mensaje para el backend
      const isFinalInteraction = botMessageCount + 1 === parseInt(process.env.REACT_APP_MAX_INTERACTIONS_CHATBOT_3, 10) || 1;
      const complementaryMessage = isFinalInteraction
      ? `Esta es la última interacción: "${inputValue}". Genera 3 publicaciones basadas en esta noticia o tópico consideran también la estrategia generada: "${valueBrandStrategy}". Cada una de estas publicaciones debe corresponder a cada una de las 3 opciones que conoces. Responde únicamente con un JSON válido con este formato, donde cada pieza de contenido tenga 600 caracteres:
    
    {
      "publicaciones": [
        {
          "titulo": "Título de la publicación",
          "contenido": "Contenido de la publicación",
          "fecha": "Fecha de publicación en formato YYYY-MM-DD"
        },
        {
          "titulo": "Título de la publicación",
          "contenido": "Contenido de la publicación",
          "fecha": "Fecha de publicación en formato YYYY-MM-DD"
        },
        {
          "titulo": "Título de la publicación",
          "contenido": "Contenido de la publicación",
          "fecha": "Fecha de publicación en formato YYYY-MM-DD"
        }
      ]
    }
    
    No incluyas texto adicional fuera del JSON. Tu respuesta debe ser un JSON válido como el ejemplo anterior.`
      : `¿Tienes alguna otra noticia o tópico del cual quieras hacer una publicación en LinkedIn?`;
    
      setInputValue("");

      try {
        // Enviar mensaje al backend
        const botResponse = await sendChatAgent3Request(complementaryMessage);

        if (!isFinalInteraction) {
          // Mostrar la respuesta del bot solo si no es la última interacción
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: botResponse.response, sender: "bot" },
          ]);
        }

        const newBotMessageCount = botMessageCount + 1;
        setBotMessageCount(newBotMessageCount);

        // Si es la última interacción, bloquear nuevas interacciones y mostrar mensaje final
        if (isFinalInteraction) {
          try {
            const parsedResponse = JSON.parse(botResponse.response);
            if (parsedResponse.publicaciones && Array.isArray(parsedResponse.publicaciones)) {
              dispatch(setValuePublications(parsedResponse.publicaciones));
            } else {
              console.error("El JSON no tiene la estructura esperada:", parsedResponse);
            }
          } catch (error) {
            console.error("Error al parsear el JSON:", error, botResponse.response);
          }

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              text: "Haz click en continuar para ver las publicaciones sugeridas.",
              sender: "bot",
            },
          ]);
          setIsInteractionComplete(true);
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
            text:
              errorCount < 2
                ? "Hubo un error al obtener la respuesta del bot. Por favor, intenta nuevamente."
                : "Ha ocurrido un error varias veces. Por favor, continúa al siguiente paso.",
            sender: "bot",
          },
        ]);

        if (errorCount >= 2) {
          setIsInteractionComplete(true); // Bloquear nuevas interacciones después de varios errores
        }
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
      await trackEvent("evt_publicaciones", leadId, {
        page: "GeneraPublicaciones",
        action: "click",
      });

      navigate("/publicaciones");
    } catch (error) {
      console.error("Error al registrar el evento:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">Ejecución de Estrategia</h1>
        <p className="text-white">
          Conversa con el Asistente para generar publicaciones relevantes
        </p>
      </div>

      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
          <h1 className="text-center text-2xl m-2 font-bold">{TEXTS.STRATEGY_BOT_TITLE}</h1>
          <h3 className="mb-3">{TEXTS.STRATEGY_BOT_SUBTITLE}</h3>
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

      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 max-w-4xl w-full rounded-lg shadow-lg">
        <p className="text-yellow-800 font-bold text-lg">
          Nota: {TEXTS.STRATEGY_BOT_GUIDE}
        </p>
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

export default Chatbot3;
