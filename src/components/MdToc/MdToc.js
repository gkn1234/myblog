/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-03 09:08:24
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-05 12:03:54
 */
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import Sticky from '../Sticky/Sticky.vue'

/**
 * 固定于页面左侧的话题栏。
 * 宽屏时，固定于页面左边，吸顶与标题栏，固定宽度。
 * 窄屏时，收缩为popup窗口
 */
export default defineComponent({
  name: 'MdToc',
  components: {
    Sticky
  },
  props: {
    // 距离顶部高度，也就是为标题栏预留的高度，传给Sticky组件
    top: {
      type: [Number, String],
      default: 0
    },
    // toc数据
    toc: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // toc容器样式
    const tocWrapperStyle = computed(() => {
      return {
        height: `calc(100vh - ${props.top}px)`
      }
    })

    // 选中目录
    const { selectedToc, selectHandler } = useSelections()



    return {
      tocWrapperStyle,
      selectedToc, selectHandler
    }
  }
})

function useSelections () {
  let selectedToc = ref('')
  // 记录选中目录
  function selectHandler (item) {
    selectedToc.value = item.content
  }

  return {
    selectedToc, selectHandler
  }
}