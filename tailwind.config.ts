import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        inherit: "inherit",
      },
      fontSize: {
        inherit: "inherit",
      },
      height: {
        "18": "4.5rem",
        "112": "28rem",
      },
      minWidth: {
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
      },
      maxWidth: {
        vw: "100vw",
      },
      width: {
        vw: "100vw",
      },
      colors: {
        "neon-carrot": {
          "50": "#fff8ed",
          "100": "#ffefd4",
          "200": "#ffdba8",
          "300": "#ffc171",
          "400": "#ff9933",
          "500": "#fe7e11",
          "600": "#ef6307",
          "700": "#c64808",
          "800": "#9d3a0f",
          "900": "#7e3110",
          "950": "#441606",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.bold"),
          lineHeight: theme("lineHeight.snug"),
          cursor: theme("cursor.default"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.semibold"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.medium"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h4: {
          fontSize: theme("fontSize.base"),
          fontWeight: theme("fontWeight.medium"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        h5: {
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.medium"),
          lineHeight: theme("lineHeight.normal"),
          cursor: theme("cursor.default"),
        },
        p: {
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.normal"),
        },
        span: {
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.normal"),
        },
      });
    }),
  ],
};
export default config;
