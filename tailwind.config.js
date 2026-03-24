/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#eee9df',
        'accent': '#ffb162',
        'secondary-accent': '#a35139',
        'neutral-light': '#c9c1b1',
        'primary-dark': '#2c3b4d',
        'deep-dark': '#1b2632',
      },
    },
  },
  plugins: [],
}
