import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';

export default (params) => ({
  base: './',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      configs: path.resolve(__dirname, './src/configs'),
      layouts: path.resolve(__dirname, './src/layouts'),
      modules: path.resolve(__dirname, './src/modules'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles'),
      utils: path.resolve(__dirname, './src/utils'),
      services: path.resolve(__dirname, './src/services'),
      router: path.resolve(__dirname, './src/router'),
      hooks: path.resolve(__dirname, './src/hooks'),
      types: path.resolve(__dirname, './src/types'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // If you need to customize other tokens of the component, configure it here
        },
      },
    },
  },

  plugins: [
    svgr(),
    react(),
    params.mode === 'mock' &&
      viteMockServe({
        mockPath: './mock',
        localEnabled: true,
      }),
  ],

  build: {
    cssCodeSplit: false,
  },

  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/api': {
        // Use for development environment request forwarding
        // For more information: https://vitejs.dev/config/#server-proxy
        target: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
        changeOrigin: true,
      },
    },
  },
});
