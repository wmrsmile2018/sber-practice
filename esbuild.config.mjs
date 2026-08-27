import esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Path alias resolver ---
const aliases = {
  'shared/': path.resolve(__dirname, 'src/1-shared/'),
  'entities/': path.resolve(__dirname, 'src/2-entities/'),
  'features/': path.resolve(__dirname, 'src/3-features/'),
  'widgets/': path.resolve(__dirname, 'src/4-widgets/'),
  'pages/': path.resolve(__dirname, 'src/5-pages/'),
  'app/': path.resolve(__dirname, 'src/6-app/'),
};

function resolveModule(baseDir, moduleName) {
  const exact = path.resolve(baseDir, moduleName);

  // If it's a directory, try index files first
  if (fs.existsSync(exact) && fs.statSync(exact).isDirectory()) {
    for (const ext of ['/index.tsx', '/index.ts', '/index.jsx', '/index.js']) {
      const indexPath = exact + ext;
      if (fs.existsSync(indexPath)) return indexPath;
    }
    return null;
  }

  // Try as file with extensions
  for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
    const withExt = exact + ext;
    if (fs.existsSync(withExt)) return withExt;
  }

  return null;
}

const aliasPlugin = {
  name: 'alias',
  setup(build) {
    const filter = new RegExp(
      Object.keys(aliases).map((a) => a.replace('/', '\\/')).join('|')
    );

    build.onResolve({ filter }, (args) => {
      for (const [alias, resolvedBase] of Object.entries(aliases)) {
        if (args.path.startsWith(alias)) {
          const relative = args.path.slice(alias.length);
          const resolved = resolveModule(resolvedBase, relative);
          if (resolved) {
            return { path: resolved };
          }
        }
      }
    });
  },
};

// --- CSS Modules resolver ---
const cssModulesPlugin = {
  name: 'css-modules',
  setup(build) {
    build.onLoad({ filter: /\.module\.css$/ }, async (args) => {
      const source = fs.readFileSync(args.path, 'utf-8');
      // Простейший CSS Modules transform: заменяем import на объект с классами
      const classNames = {};
      const classMatches = source.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{/g);
      let i = 0;
      for (const match of classMatches) {
        const original = match[1];
        const hashed = `${original}-${i.toString(16).padStart(4, '0')}`;
        classNames[original] = hashed;
        i++;
      }
      const json = JSON.stringify(classNames);
      const content = `export default ${json};`;
      return { contents: content, loader: 'js' };
    });
  },
};

// --- SVG loader (inline as data URI) ---
const svgPlugin = {
  name: 'svg',
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const source = fs.readFileSync(args.path, 'utf-8');
      const base64 = Buffer.from(source).toString('base64');
      const dataUri = `data:image/svg+xml;base64,${base64}`;
      return { contents: `export default "${dataUri}";`, loader: 'js' };
    });
  },
};

// --- HTML injector ---
const htmlPlugin = {
  name: 'html',
  setup(build) {
    build.onLoad({ filter: /\.html$/ }, () => {
      const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      return { contents: html, loader: 'text' };
    });
  },
};

const isDev = process.argv.includes('--dev');

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    splitting: true,
    outdir: 'dist-esbuild',
    format: 'esm',
    target: ['es2023'],
    jsx: 'automatic',
    minify: !isDev,
    sourcemap: isDev,
    platform: 'browser',
    metafile: !isDev,
    plugins: [aliasPlugin, cssModulesPlugin, svgPlugin, htmlPlugin],
    logLevel: 'info',
    define: {
      'import.meta.env.VITE_NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    },
  })
  .then((result) => {
    if (result.metafile) {
      const totalSize = Object.values(result.metafile.outputs)
        .reduce((sum, output) => sum + (output.bytes || 0), 0);
      const chunks = Object.keys(result.metafile.outputs).length;
      console.log(`\n✓ Build complete: ${chunks} chunks, ${totalSize} bytes total`);
    }
  })
  .catch(() => process.exit(1));
