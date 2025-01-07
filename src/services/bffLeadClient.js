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
    const organizationId = process.env.REACT_APP_ORGANIZATION_ID;
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
  
  
  export default bffLeadClient;
