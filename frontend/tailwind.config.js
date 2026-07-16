/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          light: '#F6F7FB',
          dark: '#0A0F1C',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827',
        },
        ink: {
          light: '#12141C',
          dark: '#E7ECF7',
        },
        accent: {
          cyan: '#38BDF8',
          violet: '#8B7CF6',
          coral: '#FF7A6B',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-signal': 'linear-gradient(135deg, #38BDF8 0%, #8B7CF6 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(15, 18, 30, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
