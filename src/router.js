/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:09:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 16:40:39
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
  },
  {
    path: '/blog',
    component: () => import('@/pages/Blog/Blog.vue')
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