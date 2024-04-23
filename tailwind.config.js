/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        calc: "calc(min(100vw - 20px, 1050px));",
      },
      colors: {
        primary: "",
        "primary-fg": "",
        secondary: "",
        "secondary-fg": "",
        muted: "",
        "muted-fg": "",
        accent: "",
        "accent-fg": "",
        destructive: "",
        "destructive-fg": "",
      },
    },
  },
  plugins: [],
};
