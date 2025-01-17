/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'primary-dark': '#000000',
            'primary-light': '#a284a9',
            'secondary-dark': '#1a1a1a',
          },
          backgroundImage: {
            'gradient-radial': 'radial-gradient(circle at top, #1e132b, #000000)',
          },
        },
      },
      plugins: [],
    }
