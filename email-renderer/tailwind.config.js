import { pixelBasedPreset } from "@react-email/components";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",
        blue: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        gray: {
          300: "#d1d5db",
        },
      },
    },
  },
};
