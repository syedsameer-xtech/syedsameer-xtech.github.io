/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPurple: "rgb(132, 0, 255)",
        backgroundDark: "#060010",
        borderColor: "#392e4e",
        glowPurple: "rgba(132, 0, 255, 0.2)",
      },
      spacing: {
        'card-padding': '1.25rem',
        'card-gap': '0.5em',
      },
      borderRadius: {
        'card': '20px',
      },
      fontSize: {
        'clamp-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(132, 0, 255, 0.2)',
        'cardHover': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
