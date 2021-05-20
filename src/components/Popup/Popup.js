/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:26:57
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 16:31:53
 */
import { defineComponent, watchEffect, ref, reactive, onBeforeUnmount, computed } from 'vue'

export default defineComponent({
  name: 'Popup',
  emit: [
    // 双向绑定isShow
    'update:isShow'
  ],
  props: {
    // 浮动窗口位置
    position: {
      default: 'center',
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    },
    // 动画持续时间，单位为毫秒
    animationTime: {
      default: 200,
      type: Number
    },
    // 弹框容器的样式类
    popupClass: {
      default: '',
      type: String
    }
  },
  setup (props, { emit }) {
    const { showSignal, animationClass, maskAnimationClass, animationDuration, show, hide } = usePopupTrigger(props, emit)

    return {
      showSignal, animationClass, maskAnimationClass, animationDuration, show, hide
    }
  }
})

// 处理弹框逻辑
function usePopupTrigger (props, emit) {
  // 真正控制弹框内容的隐藏与显示
  let showSignal = ref(props.isShow)
  // 正在执行动画
  let isAnimating = ref(false)
  // 动画行为类
  let animationClass = ref('')
  let maskAnimationClass = ref('')
  // 动画持续时间
  let animationDuration = reactive({})

  // 定时器对象
  let timer = null

  onBeforeUnmount(() => {
    clearTimeout(timer)
  })

  watchEffect(() => {
    trigger(props.isShow)
  })

  // 激活弹框
  function trigger (isShow = true) {
    if (showSignal.value === isShow && !isAnimating.value) { return }

    if (isShow) {
      // 显示弹框
      showSignal.value = true
      // 激活动画
      triggerAnimation(true, 'in')
      // 禁止滚动
      triggerScroll(false)

      clearTimeout(timer)
      timer = setTimeout(() => {
        // 动画结束
        triggerAnimation(false)
        clearTimeout(timer)
      }, props.animationTime)
    }
    else {
      // 激活动画
      triggerAnimation(true, 'out')

      clearTimeout(timer)
      timer = setTimeout(() => {
        // 动画结束
        triggerAnimation(false)
        // 隐藏弹框
        showSignal.value = false
        // 开放滚动
        triggerScroll(true)
        
        clearTimeout(timer)
      }, props.animationTime)
    }
  }

  // 动画控制
  function triggerAnimation (isActivating = true, state = 'in') {
    state = state === 'out' ? 'out' : 'in'
    if (isActivating) {
      isAnimating.value = true
      animationClass.value = `${props.position}-${state}`
      maskAnimationClass.value = `fade-${state}`
      animationDuration.animationDuration = `${props.animationTime}ms`
    }
    else {
      animationClass.value = ''
      maskAnimationClass.value = ''
      delete animationDuration.animationDuration
      isAnimating.value = false
    }
  }

  // 窗口滑动控制
  function triggerScroll (isScrollAllow = true) {
    if (isScrollAllow) {
      document.body.style.overflow = ''
      document.body.style.position = ''
    }
    else {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'
    }
  }

  // 双向绑定isShow的对象
  let showModel = computed({
    get () {
      return props.isShow
    },
    set (val) {
      emit('update:isShow', val)
    }
  })
  // 手动控制显示与隐藏
  function show () { showModel.value = true }
  function hide () { showModel.value = false }


  return { showSignal, animationClass, maskAnimationClass, animationDuration, show, hide }
}