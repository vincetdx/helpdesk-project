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
          base: '#eff1f5',    // Sfondo pagina
          surface: '#e6e9ef', // Sfondo card/input
          overlay: '#9ca0b0', // Bordi/Placeholder
          text: '#4c4f69',    // Testo scuro
          subtext: '#6c6f85', // Testo secondario
          blue: '#1e66f5',    // Bottoni
          lavender: '#7287fd',
          red: '#d20f39',
          peach: '#fe640b',
          green: '#40a02b',
          rosewater: '#dc8a78'
        }
      },
    },
  },
  plugins: [],
};