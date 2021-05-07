/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-24 11:12:18
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 16:45:33
 */
import { defineComponent, ref, onMounted } from 'vue'
import { transparentHeaderPage } from '@/mixins/index'

import { IndexSection, Button } from '@/components/index'

import bannerUrl1 from '/img/banner.png'
import bannerUrl2 from '/img/banner3.png'

export default defineComponent({
  name: 'Index',
  emits: ['header-normal', 'header-transparent'],
  components: {
    IndexSection,
    Button
  },
  setup (props, { emit }) {
    // 使标题栏能够响应透明化
    transparentHeaderPage(emit)

    return {
      bannerUrl1, bannerUrl2
    }
  }
})
