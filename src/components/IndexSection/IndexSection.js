/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 19:11:23
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-28 11:44:19
 */
import { defineComponent, computed } from 'vue'

// 博客首页的通栏板块
export default defineComponent({
  name: 'IndexSection',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    // 背景图片
    backgroundImg: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const styles = computed(() => {
      let result = {
        height: props.height
      }
      if (typeof props.backgroundImg === 'string' && props.backgroundImg !== '') {
        result.backgroundImage = `url('${props.backgroundImg}')`
      }
      return result
    })

    return {
      styles
    }
  }
})
