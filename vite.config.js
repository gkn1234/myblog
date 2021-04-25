/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:01:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-25 11:37:59
 */
const path = require('path')

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
