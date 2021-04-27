/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 09:08:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 17:41:35
 */
import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  console.log(app)
  app.mount('#app')
})