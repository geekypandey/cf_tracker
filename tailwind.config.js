/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'solved-green': '#7cf07c',
            'unsolved-red': '#f02a00',
        },
    },
  },
  plugins: [],
}
