import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#F62992', // Ajout de votre couleur personnalisée ici
      },
      animation: {
        fadeIn: 'fadeIn 3s ease-in',
      },
      backdropFilter: { // this might need a plugin if it's not supported by default
        'none': 'none',
        'blur': 'blur(20px)',
      },
      backgroundColor: {
        'glass': 'rgba(0, 0, 0, 0.2)', // Adjust the alpha for transparency
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;

