module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize:{
        'md': '0.875rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

