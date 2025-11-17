module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",
        primaryDark: "#0b5e56"
      },
      container: {
        center: true,
        padding: "1rem"
      }
    }
  },
  plugins: []
};