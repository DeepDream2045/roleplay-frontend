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
        "30": "7.5rem",
      },
      minHeight: {
        "30": "7.5rem",
      },
      maxHeight: {
        "30": "7.5rem",
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
      transitionDuration: {
        3000: "3000ms",
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
        white: {
          0: "#FFFFFF",
          50: "#FDFDFD",
          100: "#F7F7F7",
          200: "#F4F4F4",
          300: "#EEEEEE",
          400: "#EBEBEB",
          500: "#E6E6E6",
          600: "#D1D1D1",
          700: "#A3A3A3",
          800: "#7F7F7F",
          900: "#616161",
        },
        black: {
          50: "#EBEBEB",
          100: "#C2C2C2",
          200: "#A4A4A4",
          300: "#7B7B7B",
          400: "#616161",
          500: "#3A3A3A",
          600: "#353535",
          700: "#292929",
          800: "#202020",
          900: "#181818",
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
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            "-webkit-appearance": "none",
            margin: "0",
          },
      });
    }),
  ],
};
export default config;
