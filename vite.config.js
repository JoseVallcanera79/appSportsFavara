import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Esto permite cualquier host externo
    allowedHosts: [
      '0.0.0.0', // permite conexiones desde cualquier IP
      '.ngrok-free.app', // permite cualquier subdominio de ngrok-free.app
    ],
  },
})
