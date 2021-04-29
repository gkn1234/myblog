/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-28 19:46:54
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-29 10:37:01
 */
import { defineComponent } from 'vue'

import IndexSection from '../IndexSection/IndexSection.vue'
import Sticky from '../Sticky/Sticky.vue'

import bannerUrl1 from '/img/banner3.png'

export default defineComponent({
  name: 'BlogContent',
  components: {
    IndexSection,
    Sticky
  },
  setup () {
    return {
      bannerUrl1
    }
  }
})