module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#FFFDFD',
        'bubble-gum': '#ff77e9',
        'bermuda': '#1C2434',
        'silver': '#fffdfd',
        'brown': '#710B40',
      },
      screens: {
        'sm': '640px',
        'md': '1034px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'custom-md': '900px', // Custom pixel-based breakpoint for medium screens
        'custom-lg': '1200px', // Custom pixel-based breakpoint for larger screens
      },
    },
  },
  plugins: [],
};
