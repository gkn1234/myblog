/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 17:22:11
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-29 10:43:48
 */
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Sticky',
  props: {
    // 触发吸顶时距离顶部的高度，相对于父元素的高度，单位px
    top: {
      type: [Number, String],
      default: 0
    },
  },
  setup (props, { emit, slots }) {
    // 吸顶检测元素对象
    const stickyEl = ref(null)
    // 吸顶检测元素/占位元素的样式
    let stickyElStyle = reactive({})

    /** @section 生命周期，绑定时触发，解绑时取消触发 */
    onMounted(() => {
      window.addEventListener('scroll', stickyCheck)
      stickyCheck()
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', stickyCheck)
    })

    /** @section 吸顶核心触发 */
    // 暂存吸顶前的样式
    let stickyStyleBefore = {}
    // 当前吸顶状态
    let isSticky = false
    // 检查吸顶
    function stickyCheck () {
      const rect = stickyEl.value.getBoundingClientRect()
      // 吸顶高度检查
      const isStickyBelow = rect.top <= props.top
      // 是否需要触发吸顶
      const isSticyTrigger = (isStickyBelow && !isSticky) || (!isStickyBelow && isSticky)
      // 获取吸顶目标元素
      const stickyTarget = slots.default()[0].el
      if (isSticyTrigger && stickyTarget) {
        if (isStickyBelow) {
          // 吸顶时，占位元素需要设置宽高
          if (!stickyElStyle.hasOwnProperty('width') || !stickyElStyle.hasOwnProperty('height')) {
            stickyElStyle.width = rect.width + 'px'
            stickyElStyle.height = rect.height + 'px'
          }

          // 调整吸顶内容的样式
          stickyStyleBefore.position = stickyTarget.style.position
          stickyStyleBefore.top = stickyTarget.style.top
          stickyStyleBefore.width = stickyTarget.style.width
          stickyStyleBefore.height = stickyTarget.style.height          

          stickyTarget.style.position = 'fixed'
          stickyTarget.style.top = props.top + 'px'
          stickyTarget.style.width = stickyElStyle.width
          stickyTarget.style.height = stickyElStyle.height          
        }
        else {
          // 解除吸顶时，恢复吸顶前的样式
          stickyTarget.style.position = stickyStyleBefore.position
          stickyTarget.style.top = stickyStyleBefore.top
          stickyTarget.style.width = stickyStyleBefore.width
          stickyTarget.style.height = stickyStyleBefore.height
        }
        isSticky = isStickyBelow
        emit('sticky', isSticky)
      }
    }

    return {
      stickyEl, stickyElStyle
    }
  }
})

