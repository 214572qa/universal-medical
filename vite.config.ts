import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引用path模块，用于配置路径别名
import path from 'path'
//引入mock插件
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        enable: command === 'serve', // 开发阶段启用 mock
      }),
    ],
    //src文件夹配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    // 强制开启 Vue Devtools 支持
    define: {
      __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://syt.atguigu.cn',
    //       changeOrigin: true,
    //     },
    //   }
    // }
  }
})
