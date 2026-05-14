// client/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f172a',    // Dark Sidebar
        'brand-teal': '#0d9488',    // Connect buttons / Active states
        'brand-bg': '#f8fafc',      // Light grey background
        'brand-accent': '#2dd4bf'   // Bright teal for highlights
      }
    },
  },
  plugins: [],
}