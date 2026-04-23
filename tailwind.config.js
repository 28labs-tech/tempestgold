
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: 'var(--color-gold-primary)',
          secondary: 'var(--color-gold-secondary)',
          light: 'var(--color-gold-light)',
        },
        black: {
          primary: 'var(--color-black-primary)',
        },
        gray: {
          dark: 'var(--color-gray-dark)',
          medium: 'var(--color-gray-medium)',
          light: 'var(--color-gray-light)',
        },
        white: {
          accent: 'var(--color-white-accent)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(to right, var(--color-gold-secondary), var(--color-gold-primary))',
      }
    },
  },
  plugins: [],
}
