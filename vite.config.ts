import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/your-repo-name/' only if you deploy to GitHub Pages under a sub-path.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
