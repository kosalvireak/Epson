/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,vue}"],
  theme: {
    extend: {
      backgrounds: {
        bi_lightblue: '#0e2f55',
        bi_darkblue: '#0b2748',
        bi_gray: '#b2b6ba',
        bi_gray_hover: '#6e7073',
        bi_white_hover: '#f2f4f7',
        bi_white_active: '#e5e5e5',
      },
      colors: {
        bi_lightblue: '#0e2f55',
        bi_darkblue: '#0b2748',
        bi_gray: '#b2b6ba',
        bi_gray_hover: '#6e7073',
        bi_white_hover: '#f2f4f7',
        bi_white_active: '#e5e5e5',
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" }
      },
    },
  },
  plugins: [],
}
