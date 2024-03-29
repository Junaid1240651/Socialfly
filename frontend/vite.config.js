import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://socialfly-two.vercel.app", // Update with your backend server URL after deployment
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
