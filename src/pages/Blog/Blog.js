/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-25 12:12:38
 */
import { defineComponent, reactive, inject, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { Button, Sticky, notice } from '@/components/index'
import { BlogList, BlogPoster } from '@/templates/index'

export default defineComponent({
  name: 'Blog',
  components: {
    BlogList,
    BlogPoster,
    Sticky,
    Button
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


    function n () {
      notice({
        type: 'default',
        title: 'ssasasa',
        content: 'asasasasa',
        duration: null
      })
    }

    const { isPosterShow, isBlogPosterEnabled, postBlogHandler } = useBlogPoster()

    return {
      trigger, h, s, n,
      isPosterShow, isBlogPosterEnabled, postBlogHandler
    }
  },
})

// 发表文章相关逻辑
function useBlogPoster () {
  // 管理员限定功能
  const user = inject('user')
  const isBlogPosterEnabled = computed(() => {
    return user.isAdmin()
  })

  // 按钮点击触发
  let isPosterShow = ref(false)
  function postBlogHandler () {
    isPosterShow.value = !isPosterShow.value
  }

  return { isPosterShow, isBlogPosterEnabled, postBlogHandler }
}