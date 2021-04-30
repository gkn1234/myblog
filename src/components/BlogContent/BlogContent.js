/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 19:46:54
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-30 11:52:25
 */
import { defineComponent, inject, onMounted } from 'vue'

import IndexSection from '../IndexSection/IndexSection.vue'
import Sticky from '../Sticky/Sticky.vue'

import bannerUrl1 from '/img/banner3.png'

export default defineComponent({
  name: 'BlogContent',
  components: {
    IndexSection,
    Sticky
  },
  async setup () {
    onMounted(() => {
      console.log('content moun')
    })
    const $http = inject('$http')
    const $md = inject('$md')
    const content = await $http('blogContent')

    console.log(content)

    const md = $md(content.md)

    return {
      bannerUrl1, md
    }
  }
})