/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        film: {
          bg: "#F5F5F3",
          surface: "#FFFFFF",
          border: "#E4E4E7",
          text: "#18181B",
          muted: "#71717A",
          teal: "#3A9DA5",
          tealDark: "#2F7E85"
        },
        filmDark: {
          bg: "#111315",
          surface: "#1A1D21",
          border: "#2D333B",
          text: "#F5F5F3",
          muted: "#A1A1AA",
          teal: "#3A9DA5",
          tealDark: "#2F7E85"
        }
      }
    }
  },
  plugins: []
};
