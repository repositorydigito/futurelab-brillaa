import axios from "axios";

const API_BASE = "http://localhost:5000"; // Cambia esto a la URL de tu backend

export const sendMessageToBot = async (message) => {
  try {
    const response = await axios.post(`${API_BASE}/bot`, { message });
    return response.data; // El backend debe retornar el texto del bot en { text: "..." }
  } catch (error) {
    console.error("Error al enviar mensaje al bot:", error);
    throw error;
  }
};
