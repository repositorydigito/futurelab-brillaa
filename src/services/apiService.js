import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para agregar seguridad o manejo de tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Cargar el token cifrado si existe
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const sendChatRequest = async (input, threadId = null) => {
  try {
    const data = {
      agent_id: process.env.REACT_APP_AGENT_ID,
      input,
      ...(threadId && { thread_id: threadId }), // Agregar thread_id solo si está presente
    };
    const response = await apiClient.post('/chat', data);
    return response.data;
  } catch (error) {
    console.error('Error en sendChatRequest:', error);
    throw error;
  }
};


export const sendChatAgent3Request = async (input, threadId = null) => {
  try {
    const data = {
      agent_id: process.env.REACT_APP_AGENT_3_ID,
      input,
      ...(threadId && { thread_id: threadId }), // Agregar thread_id solo si está presente
    };
    const response = await apiClient.post('/chat', data);
    return response.data;
  } catch (error) {
    console.error('Error en sendChatRequest:', error);
    throw error;
  }
};

export default apiClient;