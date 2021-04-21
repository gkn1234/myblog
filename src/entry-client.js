/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:08:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 11:06:59
 */
import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})