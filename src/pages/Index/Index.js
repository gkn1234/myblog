/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 11:12:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-24 18:42:23
 */
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'Index',
  setup (props, { emit }) {
    onMounted(() => {
      emit('haha')
    })

    let backgroundSrc = ref('/img/logo.png')

    return {
      backgroundSrc
    }
  }
})