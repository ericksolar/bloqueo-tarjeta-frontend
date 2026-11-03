import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // El frontend llama a /api/v1/... y Vite lo reenvía al backend FastAPI.
    // Así las cookies de sesión son del mismo origen (sin problemas de CORS/SameSite).
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
