import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const base = process.env.VITE_BASE || "/";
const outDir = process.env.VITE_OUTDIR
  ? resolve(root, process.env.VITE_OUTDIR)
  : resolve(root, "../dist/pages");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  root,
  build: {
    outDir,
    emptyOutDir: true,
  },
  server: { port: 5176, strictPort: false },
  preview: { port: 4179, strictPort: true },
});
