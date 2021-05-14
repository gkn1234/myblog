/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-14 19:44:12
 */
import { defineComponent, reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { BlogList, BlogPoster, Sticky } from '@/components/index'

export default defineComponent({
  name: 'Blog',
  components: {
    BlogList,
    BlogPoster,
    Sticky
  },
  setup () {
    let trigger = ref(true)
    let s =reactive({})
    const router = useRouter()
    
    onMounted(() => {
      console.log('blog mount')
      setTimeout(() => {
        s.height="50px"
      }, 2000)
    })

    function h () {
      // trigger.value = !trigger.value
      router.push('/blog/1')
    }

    let isPosterShow = ref(false)

    function postBlogHandler () {
      isPosterShow.value = !isPosterShow.value
    }

    return {
      trigger, h, s,
      postBlogHandler, isPosterShow
    }
  },
})