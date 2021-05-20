/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-05-08 10:30:27
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-05-08 13:48:56
 */
import { defineComponent } from 'vue'

import bannerUrl1 from '/img/banner.png'

export default defineComponent({
  name: 'BlogCard',
  props: {
    /**
     * 留言对象数据，对象的键值如下：
     * @param {String} title 文章标题
     * @param {String} desc 摘要内容，已经转换成mdHTML
     */
    blogData: {
      type: Object,
      default: () => {}
    },
  },
  setup () {

    return {
      bannerUrl1
    }
  }
})