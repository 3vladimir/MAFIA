/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        blackAndRedLinearGradient:
          "linear-gradient(150deg, rgba(224,36,65,0.9753035003063726) 8%, rgba(34,30,31,0.7960317916228992) 62%);",
        blackAndBlueRadinalGradient:
          "radial-gradient(circle, rgba(3,8,55,1) 84%, rgba(4,15,134,1) 100%)",
        blackAndYellowLinearGradient:
          "linear-gradient(171deg, rgba(214,224,36,0.9753035003063726) 8%, rgba(34,30,31,0.7960317916228992) 38%)",
        whiteAndYellowLinearGradient:
          "linear-gradient(171deg,rgba(198,162,31,0.8884687664128151) 24%, rgba(231,230,197,0.6783847327993697) 47%)",
      },
    },
  },
  plugins: [],
};
