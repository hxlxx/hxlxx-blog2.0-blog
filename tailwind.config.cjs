/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      height: {
        98: '28rem'
      },
      screens: {
        'sc-800': '800px',
        'sc-900': '900px'
      }
    }
  },
  plugins: []
}
