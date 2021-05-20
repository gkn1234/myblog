/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-20 11:53:30
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 18:06:44
 */
import { defineComponent, reactive, onBeforeUnmount } from 'vue'

const ICON_LIST = {
  default: null,
  primary: '#iconinfo-circle',
  success: '#iconcheck-circle',
  warning: '#iconwarning-circle',
  error: '#iconclose-circle'
}

export default defineComponent({
  name: 'Notice',
  setup () {
    let noticesList = reactive(new Set())

    /**
     * 添加一条消息，配置说明如下
     * @param {String} options.type default/primary/success/warning/error
     * @param {String} options.title 通知标题
     * @param {String} options.content 通知内容
     * @param {Number/null} options.duration 持续时间，单位毫秒，null代表不会自动关闭
     * 
     * @param {Number} index 消息唯一id
     */
    function addNotice ({ type, title, content, duration }, index) {
      type = type || 'default'
      title = title || ''
      content = content || ''
      duration = duration === null ? duration : (duration || 3000)

      let notice = {}
      notice.index = index
      notice.icon = ICON_LIST[type]
      notice.iconClass = `notice-icon-${type}`
      notice.title = title
      notice.content = content
      notice.remove = function () {
        noticesList.delete(notice)
      }
      notice._trigger = null
      if (typeof duration === 'number' && duration >= 0) {
        // 延时关闭
        notice._trigger = setTimeout(() => {
          notice.remove()
          clearTimeout(notice._trigger)
        }, duration)        
      }

      noticesList.add(notice)
    }

    onBeforeUnmount(() => {
      // 清除所有未执行的定时器
      noticesList.forEach((notice) => {
        notice.remove()
        clearTimeout(notice._trigger)
      })
    })

    return {
      noticesList, addNotice
    }
  }
})

