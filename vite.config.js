import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  define:{
    API__URL:`"${process.env.API__URL}"`
  },
  plugins: [react()],
})
