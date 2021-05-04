/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-04 14:47:57
 */
import { defineComponent, reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Sticky } from '@/components/index'

export default defineComponent({
  name: 'Blog',
  components: {
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

    return {
      trigger, h, s
    }
  },
})