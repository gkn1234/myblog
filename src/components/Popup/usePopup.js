/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-06-02 16:45:58
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-06-02 18:18:17
 */
import { reactive, ref, computed, onBeforeUnmount } from 'vue'

// 控制Popup显隐的双向绑定
export function useShow (props, emit) {
  let hook = {}

  hook.isShow = computed({
    get () {
      return props.isShow
    },
    set (val) {
      emit('update:isShow', val)
    }
  })

  // 手动控制显示与隐藏
  hook.show = () => { hook.isShow.value = true }
  hook.hide = () => { hook.isShow.value = false }

  return hook
}

// Popup的核心响应
export function usePopup (props) {
  let hook = {}

  // 真正控制显示与隐藏的变量
  hook.realShow = ref(props.isShow)

  // 动画是否正在执行
  hook.isAnimating = false

  // 窗口主体与遮罩的动画类
  hook.popupAnimation = ref('')
  hook.maskAnimation = ref('')

  // 控制动画执行时间
  hook.aniDurationStyle = reactive({})

  // 动画播放定时器
  hook.timer = null
  onBeforeUnmount(() => {
    clearTimeout(hook.timer)
  })

  /**
   * 播放动画，控制显隐
   * @param {Boolean} isShow true代表播放展示动画，false播放隐藏动画
   */
  hook.play = (isShow = true) => {
    const type = isShow ? 'in' : 'out'

    hook.isAnimating = true
    // 显示弹框时，全局样式调整
    if (isShow) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'
      // 控制模态框显示
      hook.realShow.value = true
    }
    // 动画样式
    hook.popupAnimation.value = `${props.position}-${type}`
    hook.maskAnimation.value = `fade-${type}`
    hook.aniDurationStyle.animationDuration = `${props.animationTime}ms`

    clearTimeout(hook.timer)
    setTimeout(() => {
      // 复原各种动画样式
      hook.popupAnimation.value = ''
      hook.maskAnimation.value = ''
      delete hook.aniDurationStyle.animationDuration
      // 隐藏弹框时，复原全局样式
      if (!isShow) {
        document.body.style.overflow = ''
        document.body.style.position = ''   
        // 控制模态框隐藏
        hook.realShow.value = false     
      }

      hook.isAnimating = false

      // 清除定时器
      clearTimeout(hook.timer)
    }, props.animationTime)
  }

  return hook
}