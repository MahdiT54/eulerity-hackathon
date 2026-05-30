import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function petsApiPlugin() {
  const servePets = (_req: any, res: any, next: any) => {
    try {
      const filePath = path.resolve('public/data/pets.json');
      const data = fs.readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    } catch {
      next(new Error('Unable to load pets data'));
    }
  };

  return {
    name: 'pets-api',
    configureServer(server: any) {
      server.middlewares.use('/pets', servePets);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use('/pets', servePets);
    },
  };
}

export default defineConfig({
  plugins: [react(), petsApiPlugin()],
});
