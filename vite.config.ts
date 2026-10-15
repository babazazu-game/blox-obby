import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

/** Только для разработки: POST /__shot?name=x.png (dataURL в теле) → art/store/shots/x.png.
 *  Так снимаются скриншоты для витрин прямо из игры в нужном размере. */
const shotSaver = {
  name: 'shot-saver',
  apply: 'serve' as const,
  configureServer(server: { middlewares: { use: (p: string, fn: (req: any, res: any) => void) => void } }) {
    server.middlewares.use('/__shot', (req, res) => {
      let body = '';
      req.on('data', (c: Buffer) => (body += c));
      req.on('end', () => {
        const q = new URL(req.url, 'http://x').searchParams;
        const name = path.basename(q.get('name') || 'shot.png');
        // dir — подпапка (кадры роликов: art/store/film/<dir>)
        const sub = (q.get('dir') || '').replace(/[^\w-]/g, '');
        const dir = path.resolve(sub ? `art/store/film/${sub}` : 'art/store/shots');
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, name), Buffer.from(body.split(',')[1], 'base64'));
        res.end('ok');
      });
    });
  },
};

/** Vite ставит crossorigin на скрипты — CDN Яндекса с ним блокирует бандл (nosniff+CORS). Убираем. */
const noCrossorigin = {
  name: 'no-crossorigin',
  transformIndexHtml: { order: 'post' as const, handler: (html: string) => html.replace(/ crossorigin(="[^"]*")?/g, '') },
};

export default defineConfig({
  plugins: [shotSaver, noCrossorigin],
  resolve: {
    alias: {
      // Каркас подключается ИСХОДНИКАМИ, а не собранным пакетом.
      //
      // Так правка в yg-core сразу видна во всех играх, без публикации и
      // переустановки. Обратная сторона: сломав каркас, ломаешь все игры
      // разом, — поэтому в нём есть typecheck, и гонять его надо перед
      // коммитом.
      'yg-core': fileURLToPath(new URL('../yg-core/src/index.ts', import.meta.url)),
    },
  },
  // Площадка распаковывает архив в подкаталог, поэтому все пути обязаны быть
  // относительными. Абсолютные дают чёрный экран.
  base: './',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // без хэшей проще сверять содержимое архива перед заливкой
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  server: { host: '127.0.0.1', port: 5190 },
});
