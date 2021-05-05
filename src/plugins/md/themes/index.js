/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-05 09:34:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 10:40:42
 */
export const themes = {
  'juejin': () => import('./juejin'),
  'github': () => import('./github'),
  'smartblue': () => import('./smartblue'),
  'cyanosis': () => import('./cyanosis'),
  'channing-cyan': () => import('./channing-cyan'),
  'fancy': () => import('./fancy'),
  'hydrogen': () => import('./hydrogen'),
  'condensed-night-purple': () => import('./condensed-night-purple'),
  'greenwillow': () => import('./greenwillow'),
  'v-green': () => import('./v-green'),
  'vue-pro': () => import('./vue-pro'),
  'healer-readable': () => import('./healer-readable'),
  'mk-cute': () => import('./mk-cute'),
  'jzman': () => import('./jzman'),
  'geek-black': () => import('./geek-black'),
  'awesome-green': () => import('./awesome-green'),
  'qklhk-chocolate': () => import('./qklhk-chocolate')
}