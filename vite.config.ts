import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['src', 'node_modules'] // Adicione 'src' para permitir acesso ao main.tsx
    }
  }
})