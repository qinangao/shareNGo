/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E3F7FE",
          100: "#ade7fe",
          200: "#94DFFE",
          300: "#679CB1",
        },
        red: { 100: "#dc3545", 200: "#bd2130" },
        light: {
          100: "#FEF5E8",
        },
        dark: {
          50: "#545b6e",
          100: "#333743",
        },
      },
    },
  },
  plugins: [],
};
