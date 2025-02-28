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
        brown: {
          50: "#F8F7F6",
          100: "#EEECE9",
          200: "#D7D3D0",
          300: "#CBC7C2",
          400: "#B9B4AF",
          500: "#96918B",
          600: "#6C665E",
          700: "#49433A",
          800: "#33302B",
          900: "#24211C",
        },
      },
    },
  },
  plugins: [],
};

export default config;
