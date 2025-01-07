import axios from 'axios';

const bffLeadClient = axios.create({
  baseURL: process.env.REACT_APP_API_BFF_LEAD,
  headers: {
    'Content-Type': 'application/json',
  },
});

bffLeadClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API; // Cambiar a false cuando la API esté lista!!!!
const organizationId = process.env.REACT_APP_ORGANIZATION_ID;

export const registerUser = async (name, email, passcode = null) => {
  if (USE_MOCK_API) {
    // Mockea la respuesta
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: "mocked-token-12345",
      lead_id: "mocked-lead-id-67890",
      organization_id: process.env.REACT_APP_ORGANIZATION_ID,
    };
  }

  // Llamada real a la API
  try {
    
    const requestBody = {
      name,
      email,
      organization_id: organizationId,
      ...(passcode && { passcode }),
    };

    const response = await bffLeadClient.post('/lead_auth', requestBody);
    return response.data; // Devuelve token, lead_id, organization_id
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const trackEvent = async (eventId, leadId, eventData = {}) => {
  if (USE_MOCK_API) {
    // Mockea la respuesta
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Evento registrado en modo mock:", { eventId, leadId, eventData });
    return {
      message: "Mocked event registered successfully",
    };
  }

  // Llamada real a la API
  try {
    const requestBody = {
      event_id: eventId,
      lead_id: leadId,
      organization_id: organizationId,
      data: eventData,
    };

    const response = await bffLeadClient.post('event', requestBody);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error("Error en trackEvent:", error);
    throw error;
  }
};
  
export default bffLeadClient;
