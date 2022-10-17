import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      util: 'rollup-plugin-node-polyfills/polyfills/util'
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true
            }),
            NodeModulesPolyfillPlugin()
      ]
    },
  },
  plugins: [vue()]
})
