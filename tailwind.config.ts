/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: 'rgb(var(--primary) / <alpha-value>)',
          'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
          accent: 'rgb(var(--accent) / <alpha-value>)',
          'accent-dark': 'rgb(var(--accent-dark) / <alpha-value>)',
          background: 'rgb(var(--background) / <alpha-value>)',
          'background-dark': 'rgb(var(--background-dark) / <alpha-value>)',
          card: 'rgb(var(--card) / <alpha-value>)',
          'card-dark': 'rgb(var(--card-dark) / <alpha-value>)',
          text: 'rgb(var(--text) / <alpha-value>)',
          'text-dark': 'rgb(var(--text-dark) / <alpha-value>)',
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  };