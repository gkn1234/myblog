/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-29 09:03:41
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-29 09:28:47
 */
import { defineComponent } from 'vue'

import { BlogContent } from '@/components/index'

import bannerUrl1 from '/img/banner.png'

export default defineComponent({
  name: 'BlogDetail',
  components: {
    BlogContent
  },
  setup () {
    return {
      bannerUrl1
    }
  }
})