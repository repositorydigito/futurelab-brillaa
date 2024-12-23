import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessageToBot } from "../../../api";

const Chatbot1 = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Gracias por tus respuestas! Ahora, hablemos un poco más sobre tu experiencia profesional. ¿Puedes contarme sobre un proyecto desafiante en el que hayas trabajado recientemente?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [botMessageCount, setBotMessageCount] = useState(1);
  const [errorCount, setErrorCount] = useState(0);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (inputValue.trim() !== "") {
      // Agrega el mensaje del usuario a la lista
      const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputValue("");

      try {
        // Envía el mensaje al backend y espera la respuesta del bot
        const botResponse = await sendMessageToBot(inputValue);

        // Agrega la respuesta del bot a la lista de mensajes
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: botResponse.text, sender: "bot" },
        ]);

        // Incrementa el contador de mensajes del bot
        setBotMessageCount(botMessageCount + 1);
        setErrorCount(0); // Reinicia el contador de errores al tener éxito
      } catch (error) {
        console.error("Error al comunicarse con el bot:", error);
        setErrorCount((prevErrorCount) => prevErrorCount + 1);

        if (errorCount < 2) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              text: "Hubo un error al obtener la respuesta del bot. Por favor, intenta nuevamente.",
              sender: "bot",
            },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              text: "Ha ocurrido un error varias veces. Por favor, continúa al siguiente paso.",
              sender: "bot",
            },
          ]);
        }
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      
      <div className="bg-custom-blue-gradient w-full py-4 text-center shadow-lg">
        <h1 className="text-yellow-400 text-4xl font-bold">Generador de Promesa de Valor</h1>
        <p className="text-white">
          Crea tu propuesta de valor única en una experiencia interactiva
        </p>
      </div>
      
      <div className="mt-24 bg-white w-full max-w-4xl rounded-lg shadow-lg">
        
        <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b border-gray-300">
          <h2 className="text-center text-lg font-bold">Conversación con el Asistente</h2>
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
                  src="https://storage.googleapis.com/a1aa/image/GeGeQvWuDwnXhUdlf2TdMv9cPQBUUCvgpHONEdYUfP8IyGuPB.jpg"
                  alt="Asistente"
                  className="ml-2 w-8 h-8 rounded-full object-cover"
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
          />
          <button
            className="ml-3 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            onClick={handleSend}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      
      {(botMessageCount >= 3 || errorCount >= 2) && (
          <div className="flex justify-center py-4">
            <button
              className="bg-blue-900 text-white border border-blue-900 rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => navigate("/promesaFinal")}
            >
              Continuar
            </button>
          </div>
        )}
    </div>
  );
};

export default Chatbot1;
