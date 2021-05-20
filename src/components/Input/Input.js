/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-15 11:50:40
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-15 16:21:30
 */
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    // 输入内容
    value: {
      default: '',
      type: String
    },
    // 输入框初始类型
    type: {
      default: 'text',
      type: String
    },
    // 是否可以清楚内容
    clearable: {
      default: true,
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const { inputObj, isFocus, inputHandler, focusHandler, blurHandler, focus, blur, clear } = basicInput(props, emit)
    const { isPasswordShow, passwordIcon, passwordShowHandler } = passwordInput()

    return {
      inputObj, isFocus, inputHandler, focusHandler, blurHandler, focus, blur, clear,
      isPasswordShow, passwordIcon, passwordShowHandler
    }
  }
})

function basicInput (props, emit) {
  // 输入框dom
  let inputObj = ref(null)
  // 输入框是否聚焦
  let isFocus = ref(false)

  // 聚焦触发
  function focusHandler (e) {
    isFocus.value = true
    emit('focus', e)
  }

  // 手动聚焦
  function focus () {
    if (inputObj.value) {
      inputObj.focus()
    }
  }

  // 失去焦点触发
  function blurHandler (e) {
    isFocus.value = false
    emit('blur', e)
  }

  // 手动失焦
  function blur () {
    if (inputObj.value) {
      inputObj.blur()
    }
  }

  // 双向绑定输入对象
  let valueModel = computed({
    get () {
      return props.value
    },
    set (val) {
      emit('update:value', val)
    }
  })

  // 输入触发
  function inputHandler (e) {
    valueModel.value = e.target.value
    console.log(e.target.value, '-', props.value, '-', valueModel.value)
    emit('input', e)
  }

  function clear () {
    valueModel.value = ''
  }

  return { inputObj, isFocus, inputHandler, focusHandler, blurHandler, focus, blur, clear }
}

function passwordInput () {
  const PASSWORD_ICON = {
    show: 'iconeye-fill',
    hide: 'iconeyeclose-fill'
  }

  let isPasswordShow = ref(false)
  let passwordIcon = ref(PASSWORD_ICON.show)

  function passwordShowHandler () {
    if (isPasswordShow.value) {
      // 隐藏密码
      isPasswordShow.value = false
      passwordIcon.value = PASSWORD_ICON.show
    }
    else {
      // 显示密码
      isPasswordShow.value = true
      passwordIcon.value = PASSWORD_ICON.hide
    }
  }

  return { isPasswordShow, passwordIcon, passwordShowHandler }
}