import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});

// Steps to use tailwind in react-project :-
// npm i tailwindcss @tailwindcss/vite
// import tailwindcss from '@tailwindcss/vite'
// plugins: [react(), tailwindcss()]
// @import "tailwindcss";
