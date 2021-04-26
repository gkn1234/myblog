/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-26 19:14:57
 */
import axios from 'axios'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Blog',
  setup () {
    let a = reactive([])
    console.log('Blog')
    axios.get('/api/test').then((res) => {
      console.log(res)
      a.push(1)
    }).catch((e) => {
      console.log(e)
    })

    return {
      a
    }
  }
})