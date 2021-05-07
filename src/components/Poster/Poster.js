/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 11:04:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 17:01:09
 */
import { defineComponent, ref } from 'vue'

import Button from '../Button/Button.vue'

export const DEFAULT_POSTER = '匿名'

export default defineComponent({
  name: 'Poster',
  components: {
    Button
  },
  emits: [
    // 输入框聚焦
    'focus',
    // 输入框失去焦点
    'blur'
  ],
  props: {
    placeholder: {
      type: String,
      default: '请输入留言'
    },
    // 背景色是否反色，true为反色(灰色)，false为正常(白色)
    reversedBg: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { postEditor, editorFocus, editorFocusHandler, editorBlurHandler } = useEditor(emit)

    return {
      postEditor, editorFocus, editorFocusHandler, editorBlurHandler
    }
  }
})

// 输入框相关逻辑处理
function useEditor (emit) {
  const postEditor = ref(null)

  // 手动聚焦输入框
  function editorFocus () {
    postEditor.value.focus()
  }

  // 输入框聚焦触发
  function editorFocusHandler () {
    emit('focus')
  }

  // 输入框失去焦点触发
  function editorBlurHandler () {
    emit('blur')
  }

  return { postEditor, editorFocus, editorFocusHandler, editorBlurHandler }
}