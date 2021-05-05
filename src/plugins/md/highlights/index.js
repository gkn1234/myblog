/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-05 10:33:42
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 10:40:52
 */
export const highlights = {
  'dark': () => import('./dark'),
  'default': () => import('./default'),
  'github': () => import('./github')
}