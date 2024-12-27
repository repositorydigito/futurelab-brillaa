import axios from "axios";

const API_BASE = "http://localhost:5000"; // Cambia esto a la URL del backend

// Función para enviar un mensaje al bot
export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post(`${API_BASE}/bot`, { message });
    return response.data; // El backend debe retornar el texto del bot en { text: "..." }
  } catch (error) {
    console.error("Error al enviar mensaje al bot:", error);
    throw error;
  }
};

// Función para enviar datos del usuario al backend
export const sendUserData = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/api/user-data`, userData);
    return response.data; // El backend debe confirmar el almacenamiento
  } catch (error) {
    console.error("Error al enviar datos del usuario:", error);
    throw error;
  }
};
