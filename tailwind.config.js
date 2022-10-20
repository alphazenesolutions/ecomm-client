/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./Component/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Lora", "serif"],
      },
      colors: {
        white: {
          1000: "#ffffff",
          400: "#DADADB",
        },
        black: {
          1000: "black",
          500: "#212527",
        },
      },
      yellow: {
        100: "#FFD55B",
        200: "#FED65A",
      },
    },
  },
  plugins: [],
};
