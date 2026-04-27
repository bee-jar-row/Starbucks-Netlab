import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      colors: {
        sbux: {
          green: "#00704A",
          dark: "#1E3932",
          gold: "#CBA258",
          cream: "#F2EFE4",
          white: "#FAFAF8",
        },
      },
    },
  },
  plugins: [],
};
export default config;