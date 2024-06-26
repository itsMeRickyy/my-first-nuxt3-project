/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins"],
        pacifico: ["Pacifico"],
        marker: ["Permanent Marker"],
        bebas: ["Bebas Neue"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
