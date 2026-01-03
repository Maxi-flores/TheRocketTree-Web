import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
};

export default config;
