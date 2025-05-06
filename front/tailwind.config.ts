import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background_1: "var(--background-1)",
        background_2: "var(--background-2)",
        foreground: "var(--foreground)",
        mono_1: "var(--mono-1)",
        mono_2: "var(--mono-2)",
        detail: "var(--detail)",

        orange: "var(--color-1)",
        sky: "var(--color-2)",
        green: "var(--color-3)",
        neutral: "var(--color-4)",
      },
      fontFamily:{
        oxanium: "var(--font-primary)",
        signika: "var(--font-secondary)",
        merienda: "var(--font-tertiary)"
      },
      boxShadow: {
        card: "1px 2px 10px 4px #0000003d",
        dark_card: "1px 2px 12px 3px #00c0ff5d",

        container: "0 0 30px 15px #0000003d",
        dark_container: "0 0 30px 15px #00c0ff5d"
      }
    },
  },
  plugins: [],
} satisfies Config;
