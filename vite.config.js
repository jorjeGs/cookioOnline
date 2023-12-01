import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: 'https://jorjeGs.github.io/cookioOnline'
})