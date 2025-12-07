import type { Config } from "ts";

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
      },
      colors: {
        background: "#09090b", // Deep Black
        surface: "#18181b",    // Dark Grey
        primary: "#7c3aed",    // Electric Violet
        accent: "#06b6d4",     // Cyan
      },
    },
  },
  plugins: [],
};
export default config;
