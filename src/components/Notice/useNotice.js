/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-20 16:00:53
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 17:04:06
 */
import { createApp } from 'vue'
import Notice from './Notice.vue'

let noticeInstance = null
let noticeWrapper = null
let noticeCount = 0

export function notice (options = {}) {
  _createWrapper()
  _createInstance()
  if (!noticeInstance) {
    console.error('Create Notice element failed!')
    return
  }

  noticeInstance.addNotice(options, noticeCount)
  noticeCount++
}

function _createWrapper () {
  if (!noticeWrapper && document) {
    noticeWrapper = document.createElement('div')
    noticeWrapper.id = 'notice-wrapper'
    document.body.appendChild(noticeWrapper)
  }
}

function _createInstance () {
  if (!noticeInstance && noticeWrapper) {
    noticeInstance = createApp(Notice).mount('#notice-wrapper')
  }
}