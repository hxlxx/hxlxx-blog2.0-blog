/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      height: {
        98: '28rem'
      },
      screens: {
        'sc-375': '375px',
        'sc-400': '400px',
        'sc-500': '500px',
        'sc-800': '800px',
        'sc-900': '900px',
        'sc-1260': '1260px'
      }
    }
  },
  plugins: []
}
