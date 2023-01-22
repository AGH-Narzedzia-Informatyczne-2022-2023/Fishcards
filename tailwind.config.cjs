/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'arima': "'Arima Madurai', serif",
      }
    },
  },
  plugins: [require("daisyui")],
};
