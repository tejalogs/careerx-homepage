import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3C61A8",
          yellow: "#F5D134",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        handwritten: ["var(--font-handwritten)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
