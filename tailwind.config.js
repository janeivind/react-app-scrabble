export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@radix-ui/themes/**/*"],
  theme: {
    extend: {
      // Add customizations if needed
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
