/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueStart: "#214F9E",
        blueEnd: "#0C1C38",
      },
      backgroundImage: {
        'custom-blue-gradient': "linear-gradient(to bottom, #214F9E, #0C1C38)",
      },
    },
  },
  plugins: [],
}

