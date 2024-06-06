/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#1ABC9C',
        customColorShadow: '#117964'
      },
    },
  },
  plugins: [],
}

