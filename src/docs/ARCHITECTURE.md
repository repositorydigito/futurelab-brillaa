# FutureLab BrillaA

Este documento describe la arquitectura del proyecto, el desarrollo de los componentes y cómo se realiza la conexión con los servicios.

---

## 1. Arquitectura General

El sistema está diseñado utilizando una arquitectura de cliente-servidor basada en React.js para el frontend y un backend con APIs para manejar la lógica de negocio y persistencia de datos. La comunicación entre ambos se realiza mediante solicitudes HTTP utilizando Axios.

### Tecnologías Principales
- **Frontend**: React.js
- **Estado Global**: Redux
- **Backend**: API basada en servicios REST
- **Estilos**: CSS

### Estructura del Proyecto
- **`src/components`**: Contiene todos los componentes reutilizables y específicos de la aplicación.
- **`src/redux`**: Manejo del estado global con Redux.
- **`src/services`**: Servicios para la conexión con el backend.
- **`src/constants`**: Contiene preguntas iniciales, estrategias y otros textos.
- **`public`**: Archivos estáticos como imágenes y configuración de manifiesto.

---

## 2. Componentes

### Principales

1. **Login**
   - Ruta: `src/components/login/login.jsx`
   - Permite al usuario ingresar al sistema mediante un modal.
   - Realiza una solicitud POST al servicio `lead-auth` con las credenciales del usuario. Si la autenticación es exitosa, almacena el token y otros datos relevantes en Redux.
   - Ejemplo de código:
     ```javascript
     const handleSubmit = async () => {
       try {
         const response = await apiClient.post('/lead-auth', formData);
         dispatch(setUser(response.data));
       } catch (error) {
         console.error('Error durante el inicio de sesión:', error);
       }
     };
     ```

2. **Promesa**
   - **Inicial**: `src/components/promesa/promesaInicial/promesaInicial.jsx`
     - Captura las respuestas iniciales del usuario y las envía al endpoint `/chat` para obtener un `thread_id` inicial.
     - Ejemplo de código:
       ```javascript
       const handleSubmit = async () => {
         try {
           const input = `{Prompt} + {Preguntas y respuestas}`;
           const response = await sendChatRequest(input);
           dispatch(setThreadId(response.thread_id));
           navigate('/chat', { state: { initialResponse: response.response } });
         } catch (error) {
           console.error('Error al enviar datos al backend:', error);
         }
       };
       ```
   - **Final**: `src/components/promesa/promesaFinal/promesaFinal.jsx`
     - Presenta un resumen de la promesa generada.

3. **Chatbots**
   - **Chatbot 1, 2, 3**: `src/components/chatbot/chatbot1/chatbot1.jsx`
     - Gestiona el flujo de preguntas y respuestas para construir la promesa de valor, estrategia y publicaciones.
     - Realiza solicitudes al endpoint `/chat` para obtener la siguiente pregunta o respuesta del bot.
     - Ejemplo de código:
       ```javascript
       const sendMessage = async (message) => {
         try {
           const response = await sendChatRequest(message, threadId);
           setMessages((prev) => [...prev, { text: response.response, sender: 'bot' }]);
         } catch (error) {
           console.error('Error al comunicarse con el bot:', error);
         }
       };
       ```

4. **Cuestionario**
   - Ruta: `src/components/cuestionario/cuestionario.jsx`
   - Permite al usuario responder preguntas relacionadas con estrategias.
   - Envía las respuestas recopiladas al endpoint `/chat` usando el Agente 2 para recibir recomendaciones adicionales.
   - Ejemplo de código:
     ```javascript
     const handleNavigation = async () => {
       try {
         const input = `${initialContent}\n\n${valuePropositionContent}\n\n${strategyContent}\n\n${complementaryMessage}`;
         const response = await sendChatAgent2Request(input);
         dispatch(setThreadId(response.thread_id));
         navigate('/chat2', { state: { cuestionarioResponse: response.response } });
       } catch (error) {
         console.error('Error al enviar datos a la API:', error);
       }
     };
     ```

5. **Estrategia**
   - Ruta: `src/components/estrategia/estrategia.jsx`
   - Muestra la estrategia basadas en las respuestas del usuario.

6. **Publicaciones**
   - Ruta: `src/components/publicaciones/publicaciones.jsx`
   - Muestra las sugerencias de publicaciones para redes sociales.

---

## 3. Manejo del Estado

Se utiliza **Redux** para manejar el estado global, estructurado de la siguiente forma:

1. **`src/redux/slices`**
   - `questionsSlice.js`: Maneja las preguntas del usuario.
   - `threadSlice.js`: Gestiona el contexto de las conversaciones mediante `thread_id`.
   - `userSlice.js`: Almacena los datos del usuario (nombre, correo, token).

2. **`src/redux/store.js`**
   - Configura el store de Redux, combinando todos los slices.

---

## 4. Servicios

Los servicios están definidos en `src/services` para centralizar las solicitudes al backend.

1. **`apiService.js`**
   - Contiene funciones genéricas para manejar peticiones HTTP (GET, POST, etc.).
   - Ejemplo:
     ```javascript
     import axios from 'axios';
     export const apiClient = axios.create({
       baseURL: 'https://api.example.com',
       headers: { 'Content-Type': 'application/json' }
     });
     ```

2. **`bffLeadClient.js`**
   - Contiene solicitudes relacionadas con leads y usuarios.

---

## 5. Conexión de Servicios y Componentes

### Flujo de Datos
1. **Registro de Sesión**
   - Los datos del usuario se envían al backend para autenticación.

2. **Promesa Inicial**
   - Captura las respuestas iniciales y las envía mediante API para generar el contexto (`thread_id`).

3. **Chatbots**
   - Utilizan el `thread_id` para mantener el contexto de las conversaciones con el backend.

4. **Cuestionario**
   - Recopila respuestas y actualiza el estado global antes de enviar al backend.

5. **Estrategia y Publicaciones**
   - Los datos generados son procesados y devueltos como PDFs descargables mediante el backend.

---

Con esta estructura, se garantiza la escalabilidad y mantenibilidad del proyecto.

