/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Color Palette
        'ablr-primary': '#435C93',      // Medium denim blue - primary brand color
        'ablr-secondary': '#93ACD2',     // Light periwinkle - secondary/light accents
        'ablr-dark': '#602C24',          // Deep reddish-brown - dark backgrounds
        'ablr-brown': '#684B47',         // Dark grayish-brown - secondary dark
        'ablr-terracotta': '#935C48',    // Muted reddish-brown - accents
        'ablr-olive': '#666656',          // Dark olive green - subtle elements
        // Legacy support (mapped to new colors)
        'ablr-blue': '#435C93',          // Maps to primary
        'ablr-dark-blue': '#602C24',     // Maps to dark
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


