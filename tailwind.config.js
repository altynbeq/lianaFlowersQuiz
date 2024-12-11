/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
          '.subtle-border': {
              backgroundColor: theme('colors.white'),
              border: '1px solid',
              borderColor: theme('colors.gray.200'),
              borderRadius: theme('borderRadius.2xl'),
              boxShadow: theme('boxShadow.custom'),
              transition: 'box-shadow 300ms ease',
              '&:hover': {
                  boxShadow: theme('boxShadow.custom-hover'),
              },
          },
      });
  },
  ],
}
