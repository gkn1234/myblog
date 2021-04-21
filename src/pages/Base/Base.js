/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 16:25:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-21 17:40:31
 */
import { defineComponent } from 'vue'

import BlogHead from '@/components/BlogHead/BlogHead.vue'

export default defineComponent({
  name: 'Base',
  components: {
    BlogHead
  },
  setup () {
    const links = [
      { text: '首页', to: '/' },
      { text: '文章', to: '/' },
      { text: '实验室', to: '/' },
      { text: '留言', to: '/' },
    ]

    return {
      links
    }
  }
})