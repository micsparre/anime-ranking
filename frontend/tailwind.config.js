/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // JavaScript and TypeScript files
    "./public/**/*.html", // HTML files in the public folder
    ".index.html", // The index.html file
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        secondary: "#00ff00",
        tertiary: "#0000ff",
      },
    },
  },
  plugins: [],
};
