/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cat: {
          base: '#eff1f5',    // Sfondo generale
          surface: '#e6e9ef', // Sfondo card
          overlay: '#9ca0b0', // Grigio per testi secondari
          text: '#4c4f69',    // Testo principale 
          subtext: '#6c6f85', // Testo secondario
          blue: '#1e66f5',    // Accento blu
          lavender: '#7287fd',// Accento viola chiaro
          red: '#d20f39',     // Errori / Alta priorità
          peach: '#fe640b',   // Media priorità
          green: '#40a02b',   // Successo / Bassa priorità
          rosewater: '#dc8a78' // Colore decorativo
        }
      },
    },
  },
  plugins: [],
};
