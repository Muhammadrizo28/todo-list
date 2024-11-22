/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '5px': '5px', 
      },
      screens: {
        'lp': '1400px', 
      },
    },
  },
  plugins: [],
};
