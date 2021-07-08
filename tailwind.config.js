module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2.5s linear infinite",
      },
      typography: theme => ({
        dark: {
          css: [
            {
              color: theme("colors.gray.400"),
              h1: {
                color: theme("colors.gray.50"),
              },
              a: {
                color: theme("colors.gray.50"),
                "&:hover": {
                  color: theme("colors.purple.200"),
                },
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
