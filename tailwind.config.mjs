/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      fd: "280px",
      xsm: "340px",
      xsm3:"330px",
      xsm1:"360px",
      xsm4:"401px",
      xsm2: "420px",
      sm: "568px",
      sm2: "650px",
      smd: "720px",
      md: "768px",
      md2: "800px",
      md3: "860px",
      md4: "900px",
      lg: "1024px",
      lg1:"1055px",
      lg2: "1100px",
      lg3: "1150px",
      xl: "1380px",
      xle:"1400px",
      "2xl": "1536px",

      // custom screens used in chooseProfile & template&Design
      'custom': '675px',
      'custom2': '400px',
    },
  },
  plugins: [],
};
