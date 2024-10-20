import path from "node:path";
import { createRequire } from "node:module";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from "vite-plugin-static-copy";
import pluginRewriteAll from "vite-plugin-rewrite-all";

const require = createRequire(import.meta.url);
const cMapsDir = path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps");
const standardFontsDir = path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "standard_fonts");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    pluginRewriteAll(),
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: "" },
        { src: standardFontsDir, dest: "" },
      ],
    }),
  ]
});
