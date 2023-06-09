import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      'AMap': 'AMap'
    },
    devServer: {
      proxy: {
        "/api": {//捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
          target: "http://localhost:8080/",//代理的api地址，就是要跨域的地址
          changeOrigin: true,// 这个参数可以让target参数是域名
          ws: true,//是否启用websockets，用不到可设为false
          pathRewrite: {//对路径匹配到的字符串重写
            "^/api": "",
          },
        },
      },
    },
  },
  server: {
    port: 8080,
    proxy: {
        "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})
