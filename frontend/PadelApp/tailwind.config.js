const { url } = require("inspector");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        loginbg: "url('/imgs/POP_Tennis_paddle.jpg')",
      },
      colors: {
        primary: "#011738",
        secondary: "#D6FF1D",
        error: "#FF0000",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
};
