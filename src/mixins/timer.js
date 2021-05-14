/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 18:45:58
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-14 18:51:44
 */

import { onBeforeUnmount } from 'vue'

// 组件内部的延时定时器
export function useTimeout () {
  let timers = new Set()

  function delay (time = 0) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        timers.delete(timer)
        resolve()
      }, time)
      timers.add(timer)
    })
  }

  onBeforeUnmount(() => {
    timers.forEach(timer => clearTimeout(timer))
    timers = null
  })

  return delay
}