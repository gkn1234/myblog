/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:09:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 12:06:50
 */
import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Index/Index.vue')
  }
]

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}