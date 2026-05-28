import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //  server: {
  //   allowedHosts: [
  //     'hiram-daughterless-veridically.ngrok-free.dev'
  //   ]
  // },
  plugins: [react()],
})
