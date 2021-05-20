/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-20 18:02:12
 */
import { defineComponent, reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Sticky, notice } from '@/components/index'
import { BlogList, BlogPoster } from '@/templates/index'

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

    function n () {
      notice({
        type: 'default',
        title: 'ssasasa',
        content: 'asasasasa',
        duration: null
      })
    }

    return {
      trigger, h, s, n,
      postBlogHandler, isPosterShow
    }
  },
})