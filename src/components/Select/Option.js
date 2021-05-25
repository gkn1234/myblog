/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-25 15:15:25
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 19:41:05
 */
import { defineComponent, ref, computed, inject, watchEffect, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Option',
  props: {
    // 关键值，具有唯一性，每一个Select下，所有Option的value值不能重复
    value: {
      type: String,
      required: true,
      validator (val) {
        return val !== ''
      }
    },
    // 显示的内容，默认与value相等
    label: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    useOptionHandler(props)

    const trueLabel = computed(() => {
      return props.label === '' ? props.value : props.label
    })

    return {
      trueLabel
    }
  }
})

// 处理Option与父组件Select的通信
function useOptionHandler (props) {
  const handler = inject('optionHandler')
  if (!handler) {
    return
  }

  let selected = ref(false)

  handler.onOptionCreated(props)
  onBeforeUnmount(() => {
    handler.onOptionDestroy(props)
  })
  watchEffect(() => {
    handler.onOptionChange(props)
  })
}