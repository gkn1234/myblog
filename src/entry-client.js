/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:08:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 19:19:30
 */
import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  console.log('client')
  app.mount('#app')
})