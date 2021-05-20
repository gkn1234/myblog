/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 11:04:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 14:55:21
 */
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { Button } from '@/components/index'

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
    'blur',
    // 输入事件
    'input'
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
    const { posterRoot, posterEditor, isEditorActive, editorFocus, editorFocusHandler } = useEditorFocus(emit)
    const { editValue, editorInputHandler } = useEditorPlaceholder(emit)

    return {
      posterRoot, posterEditor, isEditorActive, editorFocus, editorFocusHandler,
      editValue, editorInputHandler
    }
  }
})

// 输入框聚焦相关逻辑处理
function useEditorFocus (emit) {
  const posterRoot = ref(null)
  const posterEditor = ref(null)

  // 控制输入框样式
  let isEditorActive = ref(false)

  // 手动聚焦输入框
  function editorFocus () {
    posterEditor.value.focus()
  }
  // 输入框聚焦触发
  function editorFocusHandler () {
    isEditorActive.value = true
    emit('focus')
  }

  onMounted(() => {
    // 把监听点击事件放入下一轮Event Loop，放置blur事件触发过早，导致无法弹出
    let timer = setTimeout(() => {
      window.addEventListener('click', posterClickHandler)
      clearTimeout(timer)
    }, 0)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', posterClickHandler)
  })

  // 组件全局点击事件触发
  function posterClickHandler ({ target }) {
    if (posterRoot.value.contains(target)) {
      // 点击了poster内部
      editorFocus()
    }
    else {
      // 点击poster外部，才产生失去焦点事件
      isEditorActive.value = false
      emit('blur')
    }
  }

  return { posterRoot, posterEditor, isEditorActive, editorFocus, editorFocusHandler }
}

// 输入框输入提示相关逻辑处理
function useEditorPlaceholder (emit) {
  // 输入框内容
  let editValue = ref('')
  // 临时记录placeholder
  let tempPlaceholder = null
  function editorInputHandler (e) {
    const value = e.target.innerText

    if (!tempPlaceholder) {
      // 第一次保存placeholder
      tempPlaceholder = e.target.getAttribute('placeholder')
    }

    if (value !== '') {
      e.target.setAttribute('placeholder', '')
    }
    else {
      e.target.setAttribute('placeholder', tempPlaceholder)
    }

    editValue.value = value
    emit('input', value)
  }

  return { editValue, editorInputHandler }
}