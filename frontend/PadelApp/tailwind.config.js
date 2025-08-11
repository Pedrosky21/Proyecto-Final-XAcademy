const { url } = require("inspector");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        loginbg: "url('/imgs/POP_Tennis_paddle.jpg')",
        splash: "url('/imgs/splash.svg')",
        draw: "url('/imgs/draw.svg')",
      },
      colors: {
        appWhiteText: "#FFFFFF",
        appBlackText: "#141414",
        appBackground: "#011738",
        appModalBackground: "#00500B (70%)",
        appPrimary: "#D6FF1D",
        appSecondary: "#D1FF1A",
        appError: "#FF94AF",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
};
