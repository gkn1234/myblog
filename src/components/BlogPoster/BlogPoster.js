/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-14 14:38:35
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-14 18:10:20
 */
import { defineComponent } from 'vue'

import Popup from '../Popup/Popup.vue'

export default defineComponent({
  name: 'BlogPoster',
  components: {
    Popup
  },
  props: {
    /**
     * @param {Boolean} isShow 是否显示，继承给Popup组件，不再重复声明
     */
  }
})