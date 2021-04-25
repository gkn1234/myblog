/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-25 10:25:59
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-25 10:41:04
 */

const mqlMap = new Map()

export const media = {
  mounted (el, binding) {
    console.log('media-mounted', el, binding)
    const { key, val, handler } = binding.value

    const mediaKey = `(${key}: ${val})`
    let mql = mqlMap.get(mediaKey)
    if (!mql) {
      mql = window.matchMedia(mediaKey)
      mqlMap.set(mediaKey, mql)
    }

    // 马上就会调用一次
    handler(mql)

    // 监听事件
    mql.addListener(handler)
  },
  beforeUnmount (el, binding) {
    console.log('media-beforeUnmount', el, binding)
    const { key, val, handler } = binding.value

    const mediaKey = `(${key}: ${val})`
    let mql = mqlMap.get(mediaKey)
    if (mql) {
      mql.removeListener(handler)
    }
  }
}