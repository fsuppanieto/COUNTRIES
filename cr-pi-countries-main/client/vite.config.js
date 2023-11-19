import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // busque informacion para cambiar al localhost:3000, solo por el hecho de que ya estuve trabjando con ese puerto
  },
  build: {
    rollupOptions: {
      output: {
        format: "es", // Indica que se deben utilizar módulos ES
      },
    },
  },
});
