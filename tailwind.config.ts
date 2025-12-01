import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Blue
        accent: "#F97316", // Orange
        "background-light": "#FFFFFF",
        "background-off-white": "#F9FAFB",
        "background-dark": "#111827",
        "container-light": "#FFFFFF",
        "container-dark": "#1F2937",
        "text-light-primary": "#1F2937",
        "text-dark-primary": "#F9FAFB",
        "text-light-secondary": "#6B7280",
        "text-dark-secondary": "#9CA3AF",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem", // 12px
      },
    },
  },
  plugins: [],
};
export default config;
