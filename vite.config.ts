import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PETS_API = 'https://eulerity-hackathon.appspot.com';

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
