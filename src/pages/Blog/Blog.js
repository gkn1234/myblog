/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 18:02:31
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-27 19:27:25
 */
import { defineComponent, reactive, inject, onMounted } from 'vue'

export default defineComponent({
  name: 'Blog',
  async setup () {
    let a = reactive([])
    console.log('Blog')

    const $http = inject('$http')
    const res = await $http('test')

    console.log(res)
    a.push(res.a)

    /*new ApiRequest('test').request().then((res) => {
      console.log(res)
      a.push(1)
    })
    console.log('Blog')*/
    /*onMounted(() => {
      console.log('mounted1')
    })*/

    /*const res = await new ApiRequest('test').request()

    console.log(res)
    a.push(res.a)
    */

    function m () {
      console.log(11111)
    }

    return {
      a, m
    }
  },
  mounted () {
    console.log('mounted')
  }
})