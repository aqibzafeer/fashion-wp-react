/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
}