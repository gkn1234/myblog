/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:01:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-12 13:06:11
 */
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

import {
  mediaQuery,
  createApiService,
} from '@/plugins/index'

// 常规样式
import './styles/common.styl'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const apiService = createApiService()

  app.use(router)
  // API服务
  app.use(apiService)
  // 媒体查询指令插件
  app.use(mediaQuery())

  return { app, router, apiService }
}