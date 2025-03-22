/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        footerWhiteColor: "#C6DAF1",
        footerBackgroundColor: "#006666",
        footerUserProfiles: "#004848",
        footerLinkedinHoverColor: "#0072B1"
      }
    }
  },
  darkMode: "class"
};
