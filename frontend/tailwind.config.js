import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
      },

      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.15)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        chattydark: {
          primary: "#06b6d4",
          secondary: "#0f172a",
          accent: "#22d3ee",

          neutral: "#111827",
          "base-100": "#020617",
          "base-200": "#0f172a",
          "base-300": "#1e293b",

          info: "#38bdf8",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],

    darkTheme: "chattydark",

    base: true,
    styled: true,
    utils: true,
  },
};
