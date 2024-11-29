/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      colors: {
        primary: "#f42c37",
        skyText: "#32BDE8",
        secondary: "#f42c37",
        'secondary-color': '#ebe8e2',
        'black-color': '#3c3c3b',
        'black-color-dark': '#343433',
        'main-color': '#F4B318',
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
        categoryColor: "rgb(24 24 27)",
        uploadColor: "rgb(255, 255, 255)",
        notFound: "rgb(24 24 27)",
        numberNotfound: "#f26a40",
        redText: "#E02B2B ",
        dashboardOrange: 'rgba(241, 100, 55, 0.2)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};

