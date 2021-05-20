/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 19:11:23
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 14:46:10
 */
import { defineComponent, computed } from 'vue'

// 首页的通栏板块
export default defineComponent({
  name: 'Banner',
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
