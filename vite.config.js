import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// La API de la unidad 3 no habilita CORS, así que el servidor de Vite
// reenvía las peticiones /api a la API (proxy). Así el navegador ve un solo origen.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.API_TARGET || 'http://localhost:3000';
  const proxy = { '/api': { target, changeOrigin: true } };

  return {
    plugins: [react()],
    server: { port: 5173, proxy },
    preview: { port: 4173, proxy },
  };
});
