import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        gold: 'var(--gold)',
        gold2: 'var(--gold2)',
        mystic: 'var(--mystic)',
        teal: 'var(--teal)',
      },
      fontFamily: {
        serif: 'var(--serif)',
        sans: 'var(--sans)',
      },
    },
  },
  plugins: [],
};

export default config;
