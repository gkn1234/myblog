/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 19:46:54
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-11 10:56:20
 */
import { defineComponent, inject, onMounted } from 'vue'

import IndexSection from '../IndexSection/IndexSection.vue'
import MdToc from '../MdToc/MdToc.vue'
import MdRender from '../MdRender/MdRender.vue'
import PostList from '../PostList/PostList.vue'

import bannerUrl1 from '/img/banner3.png'

export default defineComponent({
  name: 'BlogContent',
  components: {
    IndexSection,
    MdToc,
    MdRender,
    PostList
  },
  async setup () {
    onMounted(() => {
      console.log('content moun')
    })
    const $http = inject('$http')
    const content = await $http('blogContent')

    console.log(content)

    const { md, toc } = content

    return {
      bannerUrl1,
      md, toc
    }
  }
})