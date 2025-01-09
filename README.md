
# FutureLab - BRILLAA

Este proyecto es una aplicación web desarrollada con React.

## Requisitos

- Node.js (versión recomendada: 16.x o superior)
- npm o yarn para gestionar dependencias

## Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd cafetaipa
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   # o si prefieres yarn
   yarn install
   ```

## Configuración

1. Duplica el archivo `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables de entorno en el archivo `.env` según tus necesidades.

## Scripts disponibles

En el archivo `package.json` encontrarás los siguientes scripts que puedes ejecutar:

- `npm start` o `yarn start`: Inicia la aplicación en modo de desarrollo.
- `npm run build` o `yarn build`: Construye la aplicación para producción.
- `npm test` o `yarn test`: Ejecuta pruebas.

## Dependencias principales

Este proyecto utiliza las siguientes dependencias clave:
{
  "@fortawesome/fontawesome-free": "^6.7.2",
  "@reduxjs/toolkit": "^2.5.0",
  "axios": "^1.7.9",
  "cra-template": "1.2.0",
  "dotenv": "^16.4.7",
  "https-browserify": "^1.0.0",
  "jspdf": "^2.5.2",
  "process": "^0.11.10",
  "react": "^19.0.0",
  "react-app-rewired": "^2.2.1",
  "react-dom": "^19.0.0",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.0.2",
  "react-scripts": "5.0.1",
  "stream-http": "^3.2.0",
  "tailwind": "^4.0.0",
  "web-vitals": "^4.2.4"
}

## Dependencias de desarrollo

Dependencias utilizadas para desarrollo y configuración:
{
  "tailwindcss": "^3.4.16"
}

## Personalización

Este proyecto utiliza:
- **Tailwind CSS** para estilos. Configuración en `tailwind.config.js`.
- **PostCSS** para procesar estilos. Configuración en `postcss.config.js`.

Si necesitas ajustar configuraciones adicionales, revisa `config-overrides.js`.

## Estructura del proyecto

- `src/`: Contiene el código fuente principal de la aplicación.
- `public/`: Recursos públicos que no pasan por el empaquetador.
- `.env.example`: Plantilla para las variables de entorno.

## Autor

- Digito Labs
