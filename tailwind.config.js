/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: 'var(--bg-app)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        secondary: 'var(--bg-secondary)',
        banner: 'var(--bg-banner)',
        borderSubtle: 'var(--border-subtle)',
        borderStrong: 'var(--border-strong)',
        textMain: 'var(--text-main)',
        textMuted: 'var(--text-muted)',
        brandBrown: 'var(--brand-brown)',
        brandBrownHover: 'var(--brand-brown-hover)',
        brandBrownLight: 'var(--brand-brown-light)',
        brandText: 'var(--brand-text)',
        emergencyRed: 'var(--emergency-red)',
        emergencyRedHover: 'var(--emergency-red-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
