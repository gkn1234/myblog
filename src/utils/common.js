/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-01 11:03:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-01 11:08:22
 */
// 防抖函数，使得handler函数将被延迟执行，无论触发的速度有多快，适用于输入
export function debounce (handler, delay) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      handler.apply(this, args)
    }, delay)
  }
}

// 节流函数，使得handler函数每次执行都必须有一个间隔wait
export function throttle (handler, wait) {
  let lastTime = 0
  
  return function (...args) {
    const nowTime = Date.now()
    
    if (nowTime - lastTime > wait) {
      handler.apply(this, args)
      lastTime = nowTime
    }
  }
}