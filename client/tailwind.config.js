/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
      },
      colors: {
        navy: { DEFAULT: '#0f172a', 2: '#1e293b' },
        whatsapp: { DEFAULT: '#25D366', dark: '#1ebe5d' },
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.08)',
        'card-lg': '0 16px 40px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        xl2: '20px',
        xl3: '28px',
      },
    },
  },
  plugins: [],
};
