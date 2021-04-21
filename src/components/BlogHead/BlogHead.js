/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 15:34:42
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 16:31:14
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogHead',
  props: {
    // 博客的子项目
    links: {
      type: Array,
      default: () => []
    }
  },
  setup () {

  }
})