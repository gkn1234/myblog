/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:01:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 17:48:22
 */
const path = require('path')
const CONFIG = require('./app.config')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function ssrTransformCustomDir () {
  return {
    props: [],
    needRuntime: true
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.isProd ? CONFIG.cosUrl : '/',
  plugins: [vue(
    {
      template: {
        ssr: true,
        compilerOptions: {
          directiveTransforms: {
            'media': ssrTransformCustomDir
          }
        }
      }
    }
  )],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, './src') },
    ]
  },
})
