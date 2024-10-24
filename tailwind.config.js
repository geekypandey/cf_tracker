/** @type {import('tailwindcss').Config} */
export default {
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
