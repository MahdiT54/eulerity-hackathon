import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PETS_API = 'https://eulerity-hackathon.appspot.com';
// proxy the pets api to the local server
// this is to avoid CORS issues
// we can also use a proxy server to do this
// but this is a simple solution for the hackathon

// make sure in production we use the actual api via env vars =)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pets': {
        target: PETS_API,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    proxy: {
      '/pets': {
        target: PETS_API,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
