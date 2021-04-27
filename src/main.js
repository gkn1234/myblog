/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:01:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 19:21:13
 */
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

import { createApiService } from '@/api/apiService'
import { media } from './directives/index'
import './styles/common.styl'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const apiService = createApiService()

  app.use(router)
  app.use(apiService)

  // 指令注册
  app.directive('media', media)

  return { app, router, apiService }
}