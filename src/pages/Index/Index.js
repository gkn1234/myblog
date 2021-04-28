/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 11:12:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-04-28 11:47:30
 */
import { defineComponent, ref, onMounted } from 'vue'

import { IndexSection } from '@/components/index'

import bannerUrl1 from '/img/banner.png'
import bannerUrl2 from '/img/banner3.png'

export default defineComponent({
  name: 'Index',
  components: {
    IndexSection
  },
  setup (props, { emit }) {
    onMounted(() => {
      emit('haha')
    })

    return {
      bannerUrl1, bannerUrl2
    }
  }
})