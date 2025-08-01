module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      backgroundColor: {
        primary: "var(--background)",
        secondary: "var(--secondary-background)",
      },
      textColor: {
        primary: "var(--foreground)",
        secondary: "var(--secondary-text)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};