/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-02 16:28:38
 */
import { defineComponent, reactive, inject, onMounted, ref } from 'vue'

import { Sticky } from '@/components/index'

export default defineComponent({
  name: 'Blog',
  components: {
    Sticky
  },
  setup () {
    let trigger = ref(true)
    let s =reactive({})
    
    onMounted(() => {
      console.log('blog mount')
      setTimeout(() => {
        s.height="50px"
      }, 2000)
    })

    function h () {
      trigger.value = !trigger.value
    }

    return {
      trigger, h, s
    }
  },
})