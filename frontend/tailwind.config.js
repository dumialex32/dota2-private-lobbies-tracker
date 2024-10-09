import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "10%": { opacity: "0" },
          "20%": { opacity: "0" },
          "30%": { opacity: "0" },
          "40%": { opacity: "0" },
          "60%": { opacity: "0" },
          "70%": { opacity: "0.6" },
          "80%": { opacity: "0.7" },
          "90%": { opacity: "0.8" },
          "90%": { opacity: "0.9" },
          "100%": { opacity: "1" },
        },
      },
    },
    animation: {
      topSlideIn: "slideInFromTop 0.9s ease-out",
      leftSlideIn: "slideInFromLeft 0.4s ease-out",
      rightSlideIn: "slideInFromRight 0.4s ease-out",
      fadeIn: "fadeIn 4s, ease-out",
    },
  },
  plugins: [],
};
