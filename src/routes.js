import Chatbot2 from "./components/chatbot/chatbot2/chatbot2";
import Chatbot3 from "./components/chatbot/chatbot3/chatbot3";
import Chatbot1 from "./components/chatbot/chatbot1/chatbot1";
import Cuestionario from "./components/cuestionario/cuestionario";
import Estrategia from "./components/estrategia/estrategia";
import Login from "./components/login/login";
import PromesaFinal from "./components/promesa/promesaFinal/promesaFinal";
import Promesa from "./components/promesa/promesaInicial/promesaInicial";
import Publicaciones from "./components/publicaciones/publicaciones";

const routes = [
    { path: "/", element: <Login /> },
    { path: "/promise", element: <Promesa /> },
    { path: "/chat", element: <Chatbot1 /> },
    { path: "/promesaFinal", element: <PromesaFinal /> },
    { path: "/cuestionario", element: <Cuestionario /> },
    { path: "/chat2", element: <Chatbot2 /> },
    { path: "/estrategia", element: <Estrategia /> },
    { path: "/chat3", element: <Chatbot3 /> },
    { path: "/publicaciones", element: <Publicaciones /> },
  ];
  
  export default routes;
  