/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-21 16:25:49
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-18 14:55:55
 */
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { BlogHeader } from '@/templates/index'

import logoUrl from '/img/logo.png'
import logoTransparentUrl from '/img/logo-transparent.png'

export default defineComponent({
  name: 'Base',
  components: {
    BlogHeader
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

    console.log(logoUrl, logoTransparentUrl)

    function handler () {
      console.log('触发')
    }

    let isTransparent = ref(false)
    let isHeaderShow = ref(true)
    function headerNormal () {
      isHeaderShow.value = true
      isTransparent.value = false
    }
    function headerTransparent () {
      isTransparent.value = true
    }
    

    return {
      links, activeIndex,
      logoUrl, logoTransparentUrl,
      isTransparent, isHeaderShow, headerNormal, headerTransparent,
      handler
    }
  }
})