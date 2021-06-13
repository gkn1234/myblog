/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 11:09:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-13 18:29:49
 */
import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    name: 'Index',
    path: '/',
    component: () => import('@/pages/Index/Index.vue')
  },
  {
    name: 'Blog',
    path: '/blog',
    component: () => import('@/pages/Blog/Blog.vue')
  },
  {
    name: 'BlogDetail',
    path: '/blog/:id',
    component: () => import('@/pages/BlogDetail/BlogDetail.vue')
  },
  {
    name: 'Message',
    path: '/message',
    component: () => import('@/pages/Message/Message.vue')
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