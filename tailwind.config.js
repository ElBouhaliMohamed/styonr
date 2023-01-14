/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#FF6004',
          '50': '#FFD4BC',
          '100': '#FFC7A7',
          '200': '#FFAE7E',
          '300': '#FF9456',
          '400': '#FF7A2D',
          '500': '#FF6004',
          '600': '#CB4A00',
          '700': '#933600',
          '800': '#5B2100',
          '900': '#230D00'
        },
        'secondary': {
          DEFAULT: '#048AFF',
          '50': '#BCE0FF',
          '100': '#A7D6FF',
          '200': '#7EC3FF',
          '300': '#56B0FF',
          '400': '#2D9DFF',
          '500': '#048AFF',
          '600': '#006CCB',
          '700': '#004E93',
          '800': '#00305B',
          '900': '#001223'
        },
      }
    },
  },
  plugins: [],
}
