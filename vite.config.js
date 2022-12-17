import { defineConfig } from 'vite'
import { resolve } from 'path'
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'bsc-lib',
      fileName: 'index'
    },
  },
  plugins: [
		vitePluginRequire({}),
	],
})