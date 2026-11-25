import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Browser build: split the JavaScript into separate files (review item T11) so the
// libraries, which rarely change, stay cached when the site's own code is updated.
// Pages are still pre-rendered to HTML by scripts/seo-build.mjs.
const vendorChunk = (id) => {
  if (!id.includes('node_modules')) return undefined
  if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
  if (/[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/.test(id)) return 'router'
  if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) return 'icons'
  return 'vendor'
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: isSsrBuild ? {} : { rollupOptions: { output: { manualChunks: vendorChunk } } },
}))
