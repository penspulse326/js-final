/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}", "./src/**/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#301E5F",
        secondary: "#6A33FF",
      },
      screens: {
        xl: "1110px",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC", "sans-serif"],
    },
  },
  plugins: [],
};
