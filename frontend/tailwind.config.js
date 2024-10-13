import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        128: "80rem",
      },
      colors: {
        "custom-blue": "#09203f",
        "custom-teal": "#537895",
        "navbar-blue": "#0c3483",
        "navbar-light": "#a2b6df",
        "navbar-mid": "#6b8cce ",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);",
        "nav-gradient": "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
        "party-main-gradient":
          "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);",
        "lobby-main-gradient":
          "linear-gradient(to right, #243949 0%, #517fa4 100%);",
        "lobby-tab": "linear-gradient(to right, #868f96 0%, #596164 100%);",
        "button-gradient":
          "linear-gradient(to right, #868f96 0%, #596164 100%);",
        "button-gradient-success":
          "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);",
      },

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
