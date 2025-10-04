/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1677FF",
      },
      colors: {
        primary: "#E2E0C8",
        secondary: "#FBFBFB",
        tertiary: "#E8F9FF",
      },
    },
  },
  plugins: [],
};
