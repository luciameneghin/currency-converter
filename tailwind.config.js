/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#F30076',
        dark: '#420039',
        light: '#DCCCFF',
        soft: '#F6F2FF',
        highlight: '#E3B505'
      },
    },
  },
  plugins: [],
}

