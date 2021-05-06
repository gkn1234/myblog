/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 14:43:01
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 15:15:44
 */
import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 组件对页面滚动进行监听
 * @param {Function} callback 回调函数
 * @param {Boolean} isImmediately 是否立即执行一次
 */
export function windowBindScroll (callback = () => {}, isImmediately = true) {
  onMounted(() => {
    window.addEventListener('scroll', callback)
    if (isImmediately) {
      callback()
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', callback)
  })
}

/**
 * 某些页面，因为banner图深色，需要在页面处于顶部时，透明化标题栏，页面向下滑动时，再正常化标题栏
 * @param {VueEmitter} emit 用于【通知 Header 组件改变样式】的消息触发器
 */
export function transparentHeaderPage (emit) {
  function transparentHandler () {
    if (window.scrollY === 0) {
      // 页面在顶部时透明化
      emit('header-transparent')
    }
    else {
      emit('header-normal')
    }
  }

  windowBindScroll(transparentHandler, true)

  // 页面离开时回复正常
  onBeforeUnmount(() => {
    emit('header-normal')
  })
}