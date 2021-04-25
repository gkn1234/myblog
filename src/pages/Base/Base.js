/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 16:25:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-24 17:25:00
 */
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import BlogHead from '@/components/BlogHead/BlogHead.vue'

export default defineComponent({
  name: 'Base',
  components: {
    BlogHead
  },
  setup () {
    const route = useRoute()

    const links = [
      { text: '首页', to: '/' },
      { text: '文章', to: '/blog' },
      { text: '实验室', to: '/projects' },
      { text: '留言', to: '/messages' },
    ]

    const activeIndex = computed(() => {
      const index = links.findIndex(data => data.to === route.path)
      return index >= 0 ? index : 0
    })

    function handler () {
      console.log('触发')
    }

    return {
      links, activeIndex,
      handler
    }
  }
})