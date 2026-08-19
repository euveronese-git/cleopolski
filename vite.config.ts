import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

function serveDecapAdmin(): Plugin {
  const adminIndex = path.resolve(__dirname, 'public/admin/index.html');
  const middleware = (req: {url?: string}, res: {setHeader: (k: string, v: string) => void; end: (b: string) => void}, next: () => void) => {
    const url = req.url?.split('?')[0];
    if (url !== '/admin' && url !== '/admin/') {
      next();
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(adminIndex, 'utf8'));
  };

  return {
    name: 'serve-decap-admin',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

function injectCloudinaryCmsConfig(cloudName: string, apiKey: string): Plugin {
  const replace = (source: string) =>
    source
      .replaceAll('__CLOUDINARY_CLOUD_NAME__', cloudName)
      .replaceAll('__CLOUDINARY_API_KEY__', apiKey);

  return {
    name: 'inject-cloudinary-cms-config',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/admin/config.yml') {
          next();
          return;
        }
        const filePath = path.resolve(__dirname, 'public/admin/config.yml');
        res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
        res.end(replace(fs.readFileSync(filePath, 'utf8')));
      });
    },
    closeBundle() {
      const outFile = path.resolve(__dirname, 'dist/admin/config.yml');
      if (!fs.existsSync(outFile)) return;
      fs.writeFileSync(outFile, replace(fs.readFileSync(outFile, 'utf8')), 'utf8');
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const cloudName = env.CLOUDINARY_CLOUD_NAME || '';
  const apiKey = env.CLOUDINARY_API_KEY || '';

  return {
    plugins: [serveDecapAdmin(), react(), tailwindcss(), injectCloudinaryCmsConfig(cloudName, apiKey)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
