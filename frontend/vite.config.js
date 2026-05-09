import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://zecheryace.github.io/Project-04/",
  plugins: [react()],
});
