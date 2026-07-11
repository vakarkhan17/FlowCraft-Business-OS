import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101820',
        steel: '#4b5563',
        signal: '#00a676',
        brass: '#d6a13d',
        graphite: '#2f353a',
        paper: '#f7f8f5'
      },
      boxShadow: {
        soft: '0 18px 48px rgba(16, 24, 32, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
