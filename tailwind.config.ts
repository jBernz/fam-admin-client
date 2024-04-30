import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mono: ["var(--font-mono)"],
      serif: ["var(--font-serif)"],
    },
    colors: {
      red: 'blue',
      white: 'white',
      lightgray: 'black',
      gray: 'dimgray',
      lightred: 'pink',
      lightgreen: 'yellowgreen',
      lightblue: 'lightblue'
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
