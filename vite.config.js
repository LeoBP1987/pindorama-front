import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          tipos: resolve(__dirname, 'tipos.html'),
          formas: resolve(__dirname, 'formas.html'),
          origens: resolve(__dirname, 'origens.html'),
          elementares: resolve(__dirname, 'elementares.html'),
          criatura: resolve(__dirname, 'criatura.html'),
          nova_criatura: resolve(__dirname, 'nova_criatura.html'),
          lendas: resolve(__dirname, 'lendas.html'),
          album: resolve(__dirname, 'album.html')
        },
      },
    },
  });