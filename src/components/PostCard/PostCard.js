/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 13:52:47
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-08 10:07:57
 */
import { defineComponent, computed, ref, nextTick } from 'vue'

import Poster from '../Poster/Poster.vue'

export default defineComponent({
  name: 'PostCard',
  emits: [
    // 点击了该留言卡的回复按钮
    'reply'
  ],
  components: {
    Poster
  },
  props: {
    /**
     * 留言对象数据，对象的键值如下：
     * @param {String} id id，标识回复的唯一性
     * @param {String} poster 留言者
     * @param {Date} time 留言时间
     * @param {Number | String} floor 楼层
     */
    postData: {
      type: Object,
      default: () => {}
    },
    // 背景色是否反色，true为反色(灰色)，false为正常(白色)
    reversedBg: {
      type: Boolean,
      default: false
    },
    // 是否展开回复框
    isReplyShow: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const floorStr = computed(() => {
      const floor = props.postData.floor
      if (!floor && typeof floor !== 'number' && floor !== 'string') { return '' }
      return '#' + floor
    })

    const { replyPoster, clickReplyHandler, replyBlurHandler } = useReply(props, emit)

    return {
      floorStr, 
      replyPoster, clickReplyHandler, replyBlurHandler
    }
  }
})

// 【留言回复】相关逻辑
function useReply (props, emit) {
  // 留言回复组件对象
  const replyPoster = ref(null)

  // 点击回复触发
  function clickReplyHandler () {
    // 通知PostList父组件，将自身的isReplyShow状态置为true，从而展开回复框
    emit('reply', props.postData.id, true)
    // 回复框展开后立即聚焦
    nextTick(() => {
      if (replyPoster.value) {
        replyPoster.value.editorFocus()
      }
    })
  }

  // 回复框展开的情况下，输入框失去焦点触发
  function replyBlurHandler () {
    // 通知PostList父组件，将自身的isReplyShow状态置为false，从而收起回复框
    emit('reply', props.postData.id, false)
  }

  return { replyPoster, clickReplyHandler, replyBlurHandler }
}