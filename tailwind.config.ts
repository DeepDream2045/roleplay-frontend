import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "18": "4.5rem",
      },
      maxWidth: {
        vw: "100vw",
      },
      width: {
        vw: "100vw",
      },
    },
  },
  plugins: [
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
          lineHeight: theme("lineHeight.normal"),
        },
        span: {
          lineHeight: theme("lineHeight.normal"),
        },
      });
    }),
  ],
};
export default config;
