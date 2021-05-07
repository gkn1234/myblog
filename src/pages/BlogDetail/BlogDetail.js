/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-04-29 09:03:41
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-07 16:43:39
 */
import { defineComponent } from 'vue'

import { BlogContent } from '@/components/index'

import { transparentHeaderPage } from '@/mixins/index'

import bannerUrl1 from '/img/banner.png'

export default defineComponent({
  name: 'BlogDetail',
  emits: ['header-normal', 'header-transparent'],
  components: {
    BlogContent
  },
  setup (props, { emit }) {
    transparentHeaderPage(emit)

    return {
      bannerUrl1
    }
  }
})