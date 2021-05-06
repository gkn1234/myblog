/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-06 11:04:14
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-06 14:15:34
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Poster',
  props: {
    placeholder: {
      type: String,
      default: '请输入留言'
    },
    // 背景色是否反色，true为反色(灰色)，false为正常(白色)
    reversedBg: {
      type: Boolean,
      default: false
    }
  },
  setup () {

  }
})