import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'pinkish-grey': '#c4c4c4',
        'green-teal': '#0ab463',
        'emerald': '#089954',
        'dark-grey': '#383838',
        'warm-grey': '#848484BF',
        'gainsboro': '#dadada',
        'azure': '#0094ff'
      }
    },
    fontFamily: {
      sans: ['var(--font-montserrat)'],
    }
  },
  plugins: [],
};
export default config;
