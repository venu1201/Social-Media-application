/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        slidedown: "slidedown 0.1s ease-in-out forwards",
        slidetop: "slidetop 0.1s ease forwards",
        bounceshort:"bounce 1s ease-in-out 0.5"
      },
      keyframes: {
        slidedown: {
          "0%": { transform: "translateY(-130%)" },
          "100%": { transform: "translateY(-90%)" },
        },
        slidetop:{
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      backgroundImage: {
        'gradient2': 'linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)',
        'gradient': 'linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)',
        
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.9)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        navbar:"rgba(0,0,0,0.25)",
        blur:"rgba(0,0,0,0.4)",
        
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Satisfy: ["Satisy"]
      },
    },
    screens: {
        tiny:"300px",
        medium:"450px",
        xmedium:"630px",
        xsmall:"730px",
        Small:"900px",
        xSmall:"1020px",
        large:"1219px",
        xlarge:"1150px",
        Large:"1350px"
    },
  },
  plugins: [],
};